"use client"
import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const [isRedirecting, setIsRedirecting] = useState(false);


  useEffect(() => {
    // Only handle redirection for already signed-in users
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      const userEmail = user.primaryEmailAddress.emailAddress;
      localStorage.setItem('userEmail', userEmail);
      const encodedEmail = encodeURIComponent(userEmail);
      window.location.replace(`https://elevate-ai-xi.vercel.app/student/dashboard?email=${encodedEmail}`);
    }
  }, [isLoaded, isSignedIn, user]);


  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gradient-to-br from-blue-600 to-blue-800 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="hidden lg:relative lg:block lg:p-12">
            <div className="mb-8">
              <Image
                src="/elevate-ai.png"
                alt="ElevateAI Logo"
                width={180}
                height={45}
                className="brightness-0 invert"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Transform Your Career Journey with ElevateAI
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Connect with industry mentors, discover opportunities, and accelerate 
              your growth in tech. Join our community of ambitious professionals 
              and take your career to new heights.
            </p>

            <div className="mt-8">
              <div className="space-y-4 text-white/80">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                  </svg>
                  <span>Expert Mentorship from Industry Leaders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                  </svg>
                  <span>Exclusive Job Opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                  </svg>
                  <span>Personalized Career Development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl flex flex-col items-center justify-center lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Image
                src="/elevate-ai.png"
                alt="ElevateAI Logo"
                width={140}
                height={35}
                className="mb-6"
              />

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to ElevateAI
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Join our platform to connect with mentors, find opportunities, 
                and accelerate your career growth.
              </p>
            </div>
            <div className="h-12"></div>

            <SignIn 
      routing="path"
      path="/sign-in"
      afterSignInUrl={`https://elevate-ai-xi.vercel.app/student/dashboard`}
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          rootBox: {
            display: isRedirecting ? 'none' : 'block'
          }
        }
      }}
    />
          </div>
        </main>
      </div>
    </section>
  );
}