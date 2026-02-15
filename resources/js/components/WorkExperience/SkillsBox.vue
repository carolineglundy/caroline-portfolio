<template>
  <div class="mt-0 mb-12">
    <div class="bg-black text-white p-10 relative shadow-[10px_10px_0px_0px_rgba(249,115,22,1)] border-[4px] border-black overflow-hidden h-full flex flex-col justify-between">

      <div class="absolute top-0 left-0 w-6 h-6 bg-orange-500"></div>
      <div class="absolute bottom-0 right-0 w-6 h-6 bg-orange-500"></div>

      <div class="mb-8 border-b-2 border-orange-500/30 pb-4">
        <h3 class="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Key Technical Skills</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">

        <div class="flex flex-col gap-2 group">
          <div class="flex items-center gap-3">
            <div class="text-xl group-hover:rotate-12 transition-transform">⚡</div>
            <span class="font-black uppercase tracking-tighter text-sm text-orange-500 italic">Frontend Mastery</span>
          </div>
          <p class="font-bold tracking-tight text-[13px] leading-relaxed text-gray-300">
            Angular, React, Vue.js, TypeScript, Tailwind CSS.
          </p>
        </div>

        <div class="flex flex-col gap-2 group">
          <div class="flex items-center gap-3">
            <div class="text-xl group-hover:rotate-12 transition-transform">🐘</div>
            <span class="font-black uppercase tracking-tighter text-sm text-orange-500 italic">Backend Architecture</span>
          </div>
          <p class="font-bold tracking-tight text-[13px] leading-relaxed text-gray-300">
            C#/.NET, PHP (Laravel), Java (Spring Boot), MySQL, PostgreSQL.
          </p>
        </div>

        <div class="flex flex-col gap-2 group">
          <div class="flex items-center gap-3">
            <div class="text-xl group-hover:rotate-12 transition-transform">💳</div>
            <span class="font-black uppercase tracking-tighter text-sm text-orange-500 italic">Payment & Subscription Platforms</span>
          </div>
          <p class="font-bold tracking-tight text-[13px] leading-relaxed text-gray-300">
            Stripe, Zuora, Braintree. Complex lifecycle & conversion optimization.
          </p>
        </div>

        <div class="flex flex-col gap-2 group">
          <div class="flex items-center gap-3">
            <div class="text-xl group-hover:rotate-12 transition-transform">☁️</div>
            <span class="font-black uppercase tracking-tighter text-sm text-orange-500 italic">Cloud & DevOps</span>
          </div>
          <p class="font-bold tracking-tight text-[13px] leading-relaxed text-gray-300">
            Azure, AWS, CI/CD Pipelines, Docker, Jenkins, Octopus Deploy.
          </p>
        </div>

      </div>

      <div class="mt-10 pt-6 border-t-2 border-orange-500/30 flex justify-between items-center">
        <div class="hidden md:block">
        </div>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=carolinegracelundy@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-orange-500 text-black px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Contact Me
        </a>
      </div>

    </div>
  </div>
</template>
