import Navbar from '../components/navbar'
import { Button } from '../components/ui/button'
import { useEffect, useState, useRef } from 'react'
import useAppDispatch from '@/components/hooks/use-app-dispatch';
import { getUserData } from '@/store/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { ArrowLeft, ArrowRight, Loader, Sparkles } from 'lucide-react';
import { DraftPilotLogo } from '@/components/ui/draft-mail-icon';
import QuestionBlock from '@/components/questions';
import { InitQuestions } from '@/lib/config';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useNavigate } from 'react-router';

function Home() {

  const appDispatch = useAppDispatch();
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.userdata);

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Redirect to mail page with new UUID
    setIsGenerating(false)
  }

  const handleNext = () => {
    if (user == undefined) {
      navigate("/login")
      return 
    }
    if (answers[currentQuestionIndex] == undefined || answers[currentQuestionIndex] == "") {
      toast.info("Please answer the current question first!")
      return
    }
    if (currentQuestionIndex < 8) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleGenerate();
    }
  }
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const questionWidth = container.clientWidth;
      container.scrollTo({
        left: currentQuestionIndex * questionWidth,
        behavior: 'smooth'
      });
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const main = async () => {
      if (user == undefined) {
        appDispatch(getUserData());
      }
    }
    main();
  }, []);

  return (
    <>
      <Navbar />
      <AppSidebar />
      <div className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl lg:max-w-3xl space-y-8">
          {/* Hero Section */}
          <div 
            className={cn(
              "text-center space-y-4 transition-all duration-500 ease-in-out",
              currentQuestionIndex < 1
                ? "opacity-100 translate-y-0 max-h-[500px] overflow-visible" 
                : "opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-lg font-semibold text-sidebar-foreground ">
              <DraftPilotLogo className='h-10 w-10 ' />
              Draft Pilot AI
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Write better emails, <span className="text-primary">faster</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground text-pretty">
              Let AI help you craft the perfect email. Just answer a few questions and get a professional draft in
              seconds.
            </p>
          </div>

          {/* Questions Section */}
          <div
            ref={scrollContainerRef}
            className={cn(
              "flex items-center w-full gap-2 overflow-x-scroll snap-x snap-mandatory scrollbar-hide transition-all duration-500 ease-in-out",
              currentQuestionIndex < 1
                ? "translate-y-4 opacity-100" 
                : "translate-y-0 opacity-100"
            )}
          > 
          {
            InitQuestions.map((q, index) => (
              <QuestionBlock question={q} index={`init_q_${index}`} bold onChange={(v) => {
                setAnswers((ans) => {
                  ans[index] = v;
                  return ans
                })
              }}  />
            ))
          }
          </div>

          {/* Generate Button */}
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-0 md:pt-2">
            {
              currentQuestionIndex > 0 &&
              <Button
                size="lg"
                onClick={handlePrevious}
                // disabled={!allAnswered || isGenerating}
                className="group relative h-14 min-w-[20px] overflow-hidden rounded-xl bg-foreground/40 hover:bg-foreground/60 px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                {(
                  <>
                    <ArrowLeft className="ml-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </>
                )}
              </Button>
            }
            {
              currentQuestionIndex == 8 ?
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  // disabled={!allAnswered || isGenerating}
                  className="group relative h-14 min-w-[200px] overflow-hidden rounded-xl bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      Generate Email
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                :
                <Button
                  size="lg"
                  onClick={handleNext}
                  // disabled={!allAnswered || isGenerating}
                  className="group relative h-14 min-w-[200px] overflow-hidden rounded-xl bg-foreground hover:bg-foreground/30 text-background px-8 text-lg font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
