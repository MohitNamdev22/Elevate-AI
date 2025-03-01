"use client"
import { SignUp, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState
 } from "react";
import Image from "next/image";

export default function Page() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const handleRedirection = async () => {
      try {
        if (!hasRedirected && isLoaded && isSignedIn) {
          
          setHasRedirected(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          window.location.replace(`https://elevate-ai-xi.vercel.app/student/dashboard`);
        }
      } catch (error) {
        console.error('Redirection error:', error);
      }
    };

    handleRedirection();
  }, [isSignedIn, user, isLoaded, hasRedirected]);


  useEffect(() => {
    const handleRedirection = async () => {
      try {
        if (!hasRedirected && isSignedIn) {
          console.log('User is signed in');
          setHasRedirected(true);
          // Add a small delay before redirection
          await new Promise(resolve => setTimeout(resolve, 500));
          window.location.replace('https://elevate-ai-xi.vercel.app/signup');
        }
      } catch (error) {
        console.error('Redirection error:', error);
      }
    };

    handleRedirection();
  }, [isSignedIn, hasRedirected]);

  // Add debug logging
  useEffect(() => {
    console.log('Auth State:', {
      isSignedIn,
      hasRedirected
    });
  }, [isSignedIn, hasRedirected]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative h-full p-12 flex flex-col justify-center">
              <div className="mb-8">
                <Image
                  src="/elevate-ai.png"
                  alt="ElevateAI Logo"
                  width={180}
                  height={45}
                  className="brightness-0 invert"
                />
              </div>
              
              <div className="space-y-6 text-white">
                <h2 className="text-3xl font-bold">
                  Join the ElevateAI Community
                </h2>
                <p className="text-white/90 text-lg">
                  Get access to:
                </p>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    <span>AI-powered mock interviews</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    <span>Personalized feedback and insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    <span>Industry-specific interview prep</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Image
                src="/elevate-ai.png"
                alt="ElevateAI Logo"
                width={140}
                height={35}
                className="mb-6"
              />
              <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                Create Your Account
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Start your journey to interview success with ElevateAI
              </p>
            </div>

            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Your Account
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Start your journey to interview success with ElevateAI
              </p>
            </div>

            <div className="h-8"></div>
            <SignUp />
          </div>
        </main>
      </div>
    </section>
  );
}