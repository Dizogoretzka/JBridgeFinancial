
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const CreditScore = () => {
  const { user } = useAuth();
  const [calculating, setCalculating] = useState(false);

  // Fetch user's credit scores
  const { data: creditScores, refetch: refetchCreditScores } = useQuery({
    queryKey: ['credit-scores', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('calculated_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Set up real-time subscription for credit scores
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('credit-scores-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'credit_scores',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          refetchCreditScores();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refetchCreditScores]);

  const currentScore = creditScores?.[0];
  const previousScore = creditScores?.[1];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };

  const getScoreTrend = () => {
    if (!currentScore || !previousScore) return null;
    
    const difference = currentScore.score - previousScore.score;
    if (difference > 0) {
      return { icon: TrendingUp, color: 'text-green-600', text: `+${difference} points` };
    } else if (difference < 0) {
      return { icon: TrendingDown, color: 'text-red-600', text: `${difference} points` };
    } else {
      return { icon: Minus, color: 'text-gray-600', text: 'No change' };
    }
  };

  const scoreTrend = getScoreTrend();

  const calculateCreditScore = async () => {
    if (!user) return;

    setCalculating(true);
    
    try {
      // Simulate credit score calculation
      // In a real app, this would involve complex calculations based on:
      // - Payment history
      // - Credit utilization
      // - Length of credit history
      // - Types of credit
      // - New credit inquiries
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      const baseScore = 650;
      const randomVariation = Math.floor(Math.random() * 100) - 50; // -50 to +50
      const newScore = Math.max(300, Math.min(850, baseScore + randomVariation));
      
      const factors = {
        payment_history: Math.floor(Math.random() * 100),
        credit_utilization: Math.floor(Math.random() * 100),
        credit_length: Math.floor(Math.random() * 100),
        credit_types: Math.floor(Math.random() * 100),
        new_inquiries: Math.floor(Math.random() * 100),
      };

      const { error } = await supabase
        .from('credit_scores')
        .insert({
          user_id: user.id,
          score: newScore,
          factors: factors,
        });

      if (error) throw error;

      toast({
        title: "Credit Score Updated",
        description: `Your new J Bridge Credit Score is ${newScore}`,
      });

      refetchCreditScores();
      
    } catch (error) {
      console.error('Credit score calculation error:', error);
      toast({
        title: "Calculation Failed",
        description: "There was an error calculating your credit score. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">J Bridge Credit Score</h2>
          <p className="text-gray-600 mt-2">
            Track and monitor your creditworthiness with our proprietary scoring system.
          </p>
        </div>
        <Button
          onClick={calculateCreditScore}
          disabled={calculating}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${calculating ? 'animate-spin' : ''}`} />
          {calculating ? 'Calculating...' : 'Update Score'}
        </Button>
      </div>

      {/* Current Credit Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Credit Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {currentScore ? (
              <>
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(currentScore.score)}`}>
                  {currentScore.score}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {getScoreLabel(currentScore.score)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full ${
                      currentScore.score >= 750 ? 'bg-green-500' :
                      currentScore.score >= 650 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${((currentScore.score - 300) / 550) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  Range: 300 - 850
                </div>
                {scoreTrend && (
                  <div className={`flex items-center justify-center mt-4 ${scoreTrend.color}`}>
                    <scoreTrend.icon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{scoreTrend.text}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8">
                <div className="text-4xl font-bold text-gray-400 mb-2">---</div>
                <div className="text-gray-600 mb-4">No score available</div>
                <p className="text-sm text-gray-500">
                  Click "Update Score" to calculate your credit score
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Credit Score Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Score Factors</CardTitle>
          </CardHeader>
          <CardContent>
            {currentScore?.factors ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Payment History</span>
                    <span>{currentScore.factors.payment_history}%</span>
                  </div>
                  <Progress value={currentScore.factors.payment_history} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit Utilization</span>
                    <span>{currentScore.factors.credit_utilization}%</span>
                  </div>
                  <Progress value={currentScore.factors.credit_utilization} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit History Length</span>
                    <span>{currentScore.factors.credit_length}%</span>
                  </div>
                  <Progress value={currentScore.factors.credit_length} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit Mix</span>
                    <span>{currentScore.factors.credit_types}%</span>
                  </div>
                  <Progress value={currentScore.factors.credit_types} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>New Credit</span>
                    <span>{currentScore.factors.new_inquiries}%</span>
                  </div>
                  <Progress value={currentScore.factors.new_inquiries} className="h-2" />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No factor analysis available</p>
                <p className="text-sm">Update your credit score to see detailed factors</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Credit Score History */}
      <Card>
        <CardHeader>
          <CardTitle>Score History</CardTitle>
        </CardHeader>
        <CardContent>
          {creditScores && creditScores.length > 0 ? (
            <div className="space-y-4">
              {creditScores.map((score, index) => (
                <div key={score.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className={`text-2xl font-bold ${getScoreColor(score.score)}`}>
                      {score.score}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getScoreLabel(score.score)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(score.calculated_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(score.calculated_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No credit score history yet</p>
              <p className="text-sm">Your score history will appear here once calculated</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditScore;
