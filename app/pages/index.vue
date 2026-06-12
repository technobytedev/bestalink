<template>
  <div class="min-h-screen bg-background text-gray-100 font-sans overflow-x-hidden">

    <!-- ── NAVBAR ── -->
    <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div class="flex items-center">
        <span class="text-xl font-extrabold text-gold tracking-tight">Besta</span>
        <span class="text-xl font-extrabold text-white tracking-tight">link</span>
      </div>
      <div class="hidden md:flex items-center gap-8">
        <a href="#features" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Features</a>
        <a href="#how-it-works" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">How it works</a>
        <a href="#faq" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">FAQ</a>
      </div>
      <button class="btn-primary" @click="signIn" :disabled="loading">
        <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Start Free
      </button>
    </nav>

    <!-- ── HERO ── -->
    <section class="relative pt-36 pb-20 px-4 flex flex-col items-center text-center overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full pointer-events-none" style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%);"></div>

      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold mb-8 uppercase tracking-widest">
        <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block"></span>
        Affiliate Link Management Platform
      </div>

      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.04] tracking-tight mb-6 max-w-4xl">
        Build Your Affiliate<br>
        <span class="text-gold">Storefront</span> in Minutes
      </h1>

      <p class="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
        Showcase your products, track clicks, and grow your earnings with a beautiful personalized page.
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-3 mb-12">
        <button
          class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gold text-black font-bold text-sm hover:bg-gold-bright transition-all duration-200 disabled:opacity-50"
          style="box-shadow: 0 0 40px rgba(201,168,76,0.3);"
          @click="signIn"
          :disabled="loading"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Start Free — No credit card
        </button>
        <a href="#demo" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-gray-300 font-medium text-sm hover:border-white/20 hover:text-white transition-all duration-200">
          View Demo
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-16 text-sm text-gray-500">
        <span v-for="t in trustItems" :key="t" class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          {{ t }}
        </span>
      </div>

      <!-- Phone Mockup -->
      <div class="relative">
        <div class="absolute -inset-8 rounded-full blur-3xl pointer-events-none" style="background: radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%);"></div>
        <div class="relative mx-auto" style="width: 275px;">
          <div class="absolute -inset-px rounded-[50px] opacity-25 pointer-events-none" style="background: linear-gradient(160deg, #C9A84C 0%, transparent 45%, #C9A84C 100%);"></div>
          <div class="relative rounded-[48px] overflow-hidden" style="background: #1c1c1e; padding: 13px; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04);">
            <div class="rounded-[37px] overflow-hidden" style="background: #080808; height: 520px;">
              <!-- Dynamic island -->
              <div class="flex justify-center pt-3 pb-1">
                <div class="w-28 h-7 rounded-full" style="background: #1c1c1e;"></div>
              </div>
              <!-- URL bar -->
              <div class="px-3 mb-3">
                <div class="rounded-lg px-3 py-2 flex items-center gap-2" style="background: #151515;">
                  <div class="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <span class="text-gray-500 font-mono truncate" style="font-size: 10px;">bestalink.com/bestbodyspray</span>
                </div>
              </div>
              <!-- Profile -->
              <div class="px-4">
                <div class="text-center mb-4">
                  <div class="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center" style="background: linear-gradient(135deg, #F59E0B, #B45309); box-shadow: 0 0 20px rgba(201,168,76,0.4);">
                    <span class="text-black font-extrabold text-lg">B</span>
                  </div>
                  <div class="text-white font-semibold text-sm">bestbodyspray</div>
                  <div class="text-gray-500 mt-0.5" style="font-size: 10px;">Premium body care & wellness ✨</div>
                </div>
                <!-- Products -->
                <div class="space-y-2">
                  <div v-for="p in mockProducts" :key="p.name" class="rounded-xl flex items-center gap-2.5 p-2.5" style="background: #151515;">
                    <div class="w-10 h-10 rounded-lg flex-shrink-0" :style="{ background: p.gradient }"></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-white font-medium truncate leading-tight" style="font-size: 11px;">{{ p.name }}</div>
                      <div class="text-gray-500 mt-0.5" style="font-size: 10px;">{{ p.desc }}</div>
                    </div>
                    <div class="text-black font-extrabold px-2 py-1 rounded-lg flex-shrink-0 uppercase tracking-wider" style="background: #C9A84C; font-size: 9px;">Shop</div>
                  </div>
                </div>
                <!-- Stats -->
                <div class="mt-4 flex items-center justify-center gap-5 py-3 border-t" style="border-color: rgba(255,255,255,0.06);">
                  <div v-for="(s, i) in phoneStats" :key="s.label" class="text-center flex items-center gap-5">
                    <div>
                      <div class="text-gold text-sm font-bold">{{ s.value }}</div>
                      <div class="text-gray-600 uppercase tracking-wider" style="font-size: 9px;">{{ s.label }}</div>
                    </div>
                    <div v-if="i < phoneStats.length - 1" class="w-px h-6" style="background: rgba(255,255,255,0.08);"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full" style="background: rgba(255,255,255,0.18);"></div>
        </div>
      </div>
    </section>

    <!-- ── SOCIAL PROOF BAR ── -->
    <section class="py-12 border-y border-surface-border" style="background: rgba(20,20,20,0.5);">
      <div class="max-w-5xl mx-auto px-4">
        <p class="text-center text-xs text-gray-600 uppercase tracking-widest font-medium mb-8">Trusted by creators across</p>
        <div class="flex flex-wrap items-center justify-center gap-10 mb-10">
          <div v-for="platform in platforms" :key="platform.name" class="flex items-center gap-2 text-gray-500">
            <div class="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs" :style="{ background: platform.color }">{{ platform.abbr }}</div>
            <span class="text-sm font-medium">{{ platform.name }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-12">
          <div v-for="stat in heroStats" :key="stat.label" class="text-center">
            <div class="text-2xl font-extrabold text-white">{{ stat.value }}</div>
            <div class="text-xs text-gray-500 mt-0.5">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PRODUCT SHOWCASE ── -->
    <section id="demo" class="py-28 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-gray-400 font-medium mb-4">Your Page</div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Your store, beautifully branded
          </h2>
          <p class="text-gray-400 text-lg max-w-lg mx-auto">
            Get your own page at <span class="text-gold font-semibold">bestalink.com/yourname</span> and start showcasing products instantly.
          </p>
        </div>

        <!-- Browser mockup -->
        <div class="relative">
          <div class="absolute -inset-4 rounded-3xl blur-3xl pointer-events-none" style="background: rgba(201,168,76,0.05);"></div>
          <div class="relative rounded-2xl border border-surface-border overflow-hidden" style="background: #0c0c0c; box-shadow: 0 40px 80px rgba(0,0,0,0.6);">
            <div class="flex items-center gap-3 px-5 py-3.5 border-b border-surface-border">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div class="flex-1 rounded-lg px-4 py-1.5 flex items-center gap-2 max-w-sm mx-auto" style="background: #1a1a1a;">
                <svg class="w-3 h-3 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-400 font-mono">bestalink.com/bestbodyspray</span>
              </div>
            </div>
            <div class="p-8 md:p-12 flex flex-col items-center" style="background: #070707;">
              <div class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style="background: linear-gradient(135deg, #F59E0B, #B45309); box-shadow: 0 0 40px rgba(201,168,76,0.3);">
                <span class="text-black font-extrabold text-2xl">B</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-1">bestbodyspray</h3>
              <p class="text-gray-500 text-sm mb-1">✨ Premium body care & wellness products</p>
              <p class="text-gray-700 text-xs mb-8">Affiliate links may earn a small commission</p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                <div v-for="p in showcaseProducts" :key="p.name" class="rounded-2xl border border-surface-border overflow-hidden" style="background: #111;">
                  <div class="h-36 flex items-center justify-center text-5xl" :style="{ background: p.gradient }">{{ p.emoji }}</div>
                  <div class="p-4">
                    <div class="text-white font-semibold text-sm mb-1">{{ p.name }}</div>
                    <div class="text-gray-500 text-xs mb-3">{{ p.desc }}</div>
                    <button class="w-full py-2 rounded-lg text-black text-xs font-extrabold uppercase tracking-wider" style="background: #C9A84C;">Shop Now →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ── -->
    <section id="features" class="py-28 px-4" style="background: #050505;">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-gray-400 font-medium mb-4">Features</div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything you need to<br>
            <span class="text-gold">monetize your audience</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-lg mx-auto">
            Built from the ground up for creators, affiliates, and digital entrepreneurs.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="feature in featureCards"
            :key="feature.title"
            class="group rounded-2xl p-7 border border-surface-border hover:border-gold/30 transition-all duration-300 cursor-default"
            style="background: #0d0d0d;"
          >
            <div class="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 text-xl group-hover:bg-gold/15 transition-colors duration-300">
              {{ feature.icon }}
            </div>
            <h3 class="text-white font-semibold text-base mb-2">{{ feature.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ feature.description }}</p>
            <div v-if="feature.tag" class="mt-4 inline-flex items-center px-2.5 py-1 rounded-md bg-surface border border-surface-border text-xs text-gold font-mono">
              {{ feature.tag }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── DASHBOARD PREVIEW ── -->
    <section class="py-28 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-gray-400 font-medium mb-4">Analytics</div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Know exactly<br>
            <span class="text-gold">what's working</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-lg mx-auto">
            Track page views, link clicks, and performance — all from one beautiful dashboard.
          </p>
        </div>

        <div class="relative">
          <div class="absolute -inset-4 rounded-3xl blur-3xl pointer-events-none" style="background: rgba(201,168,76,0.05);"></div>
          <div class="relative rounded-2xl border border-surface-border overflow-hidden" style="background: #0c0c0c; box-shadow: 0 40px 80px rgba(0,0,0,0.6);">
            <!-- Dashboard header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-surface-border">
              <div class="flex items-center gap-3">
                <div class="flex items-center">
                  <span class="text-gold font-extrabold text-sm">Besta</span>
                  <span class="text-white font-extrabold text-sm">link</span>
                </div>
                <div class="w-px h-4 bg-surface-border"></div>
                <span class="text-xs text-gray-500">Dashboard</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #F59E0B, #B45309);">
                  <span class="text-black text-xs font-bold">B</span>
                </div>
                <span class="text-xs text-gray-400">bestbodyspray</span>
              </div>
            </div>

            <div class="p-6">
              <!-- Stat cards -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                <div v-for="stat in dashStats" :key="stat.label" class="rounded-xl p-4 border border-surface-border" style="background: #111;">
                  <div class="text-xs text-gray-500 mb-1.5">{{ stat.label }}</div>
                  <div class="text-2xl font-extrabold text-white">{{ stat.value }}</div>
                  <div class="flex items-center gap-1 mt-1.5">
                    <svg class="w-3 h-3 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs text-green-400">{{ stat.change }}</span>
                  </div>
                </div>
              </div>

              <!-- Chart -->
              <div class="rounded-xl p-5 border border-surface-border mb-5" style="background: #111;">
                <div class="flex items-center justify-between mb-5">
                  <div>
                    <div class="text-sm font-semibold text-white">Analytics Overview</div>
                    <div class="text-xs text-gray-500 mt-0.5">Last 7 days</div>
                  </div>
                  <div class="flex items-center gap-4 text-xs text-gray-500">
                    <span class="flex items-center gap-1.5">
                      <span class="w-3 h-0.5 bg-gold inline-block rounded"></span>Views
                    </span>
                    <span class="flex items-center gap-1.5">
                      <span class="w-3 h-0.5 bg-blue-500 inline-block rounded"></span>Clicks
                    </span>
                  </div>
                </div>
                <div style="height: 140px;">
                  <svg viewBox="0 0 700 140" class="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#C9A84C" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
                      </linearGradient>
                      <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.15"/>
                        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="28" x2="700" y2="28" stroke="#1e1e1e" stroke-width="1"/>
                    <line x1="0" y1="56" x2="700" y2="56" stroke="#1e1e1e" stroke-width="1"/>
                    <line x1="0" y1="84" x2="700" y2="84" stroke="#1e1e1e" stroke-width="1"/>
                    <line x1="0" y1="112" x2="700" y2="112" stroke="#1e1e1e" stroke-width="1"/>
                    <path d="M0,110 L100,95 L200,78 L300,52 L400,62 L500,32 L600,42 L700,18 L700,140 L0,140 Z" fill="url(#viewsGrad)"/>
                    <path d="M0,110 L100,95 L200,78 L300,52 L400,62 L500,32 L600,42 L700,18" fill="none" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M0,126 L100,119 L200,112 L300,97 L400,103 L500,84 L600,90 L700,70 L700,140 L0,140 Z" fill="url(#clicksGrad)"/>
                    <path d="M0,126 L100,119 L200,112 L300,97 L400,103 L500,84 L600,90 L700,70" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="100" cy="95" r="3.5" fill="#C9A84C"/>
                    <circle cx="200" cy="78" r="3.5" fill="#C9A84C"/>
                    <circle cx="300" cy="52" r="3.5" fill="#C9A84C"/>
                    <circle cx="400" cy="62" r="3.5" fill="#C9A84C"/>
                    <circle cx="500" cy="32" r="3.5" fill="#C9A84C"/>
                    <circle cx="600" cy="42" r="3.5" fill="#C9A84C"/>
                    <circle cx="700" cy="18" r="3.5" fill="#C9A84C"/>
                  </svg>
                </div>
                <div class="flex justify-between mt-2 px-1">
                  <span v-for="d in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="d" class="text-xs text-gray-600">{{ d }}</span>
                </div>
              </div>

              <!-- Top products -->
              <div class="rounded-xl p-5 border border-surface-border" style="background: #111;">
                <div class="text-sm font-semibold text-white mb-4">Top Performing Products</div>
                <div class="space-y-3.5">
                  <div v-for="(link, i) in topLinks" :key="link.name" class="flex items-center gap-3">
                    <span class="text-xs text-gray-600 w-4 text-right flex-shrink-0">{{ i + 1 }}</span>
                    <div class="w-7 h-7 rounded-lg flex-shrink-0" :style="{ background: link.color }"></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs text-gray-300 font-medium truncate mb-1">{{ link.name }}</div>
                      <div class="h-1.5 rounded-full overflow-hidden" style="background: #1a1a1a;">
                        <div class="h-full bg-gold rounded-full" :style="{ width: link.pct + '%' }"></div>
                      </div>
                    </div>
                    <span class="text-xs text-gray-400 flex-shrink-0">{{ link.clicks }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ── -->
    <section id="how-it-works" class="py-28 px-4" style="background: #050505;">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-gray-400 font-medium mb-4">How it works</div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Up and running<br>
            <span class="text-gold">in under 5 minutes</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="rounded-2xl p-7 border border-surface-border"
            style="background: #0d0d0d;"
          >
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <span class="text-gold text-sm font-bold">{{ i + 1 }}</span>
              </div>
              <div class="h-px flex-1 rounded-full" style="background: linear-gradient(to right, rgba(201,168,76,0.25), transparent);"></div>
            </div>
            <div class="text-2xl mb-3">{{ step.emoji }}</div>
            <h3 class="text-white font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── COMPARISON ── -->
    <section class="py-28 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-gray-400 font-medium mb-4">Why Bestalink</div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Built for creators,<br>
            <span class="text-gold">not generic links</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Bestalink col -->
          <div class="rounded-2xl p-8 border border-gold/30 relative overflow-hidden" style="background: #0d0d0d;">
            <div class="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style="background: rgba(201,168,76,0.06); transform: translate(30%, -30%);"></div>
            <div class="mb-8">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold">
                ✦ Bestalink
              </span>
            </div>
            <ul class="space-y-4">
              <li v-for="item in bestaItems" :key="item" class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-200 text-sm">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Generic col -->
          <div class="rounded-2xl p-8 border border-surface-border opacity-50" style="background: #0d0d0d;">
            <div class="mb-8">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-surface-border text-gray-500 text-xs font-semibold">
                Generic Link Pages
              </span>
            </div>
            <ul class="space-y-4">
              <li v-for="item in genericItems" :key="item" class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-500 text-sm">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section id="faq" class="py-28 px-4" style="background: #050505;">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-gray-400 font-medium mb-4">FAQ</div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.q"
            class="rounded-xl border overflow-hidden transition-colors duration-200"
            :class="openFaq === i ? 'border-gold/30' : 'border-surface-border'"
            style="background: #0d0d0d;"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              @click="toggleFaq(i)"
            >
              <span class="text-white font-medium text-sm">{{ faq.q }}</span>
              <svg
                class="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                :class="openFaq === i ? 'rotate-180 text-gold' : 'rotate-0 text-gray-500'"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: openFaq === i ? '200px' : '0px' }"
            >
              <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FINAL CTA ── -->
    <section class="py-28 px-4">
      <div class="max-w-4xl mx-auto relative">
        <div class="absolute inset-0 rounded-3xl blur-3xl pointer-events-none" style="background: rgba(201,168,76,0.07);"></div>
        <div class="relative rounded-3xl border border-gold/20 p-12 md:p-20 text-center overflow-hidden" style="background: #0d0d0d;">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 pointer-events-none" style="background: radial-gradient(ellipse at center top, rgba(201,168,76,0.1) 0%, transparent 60%);"></div>
          <div class="relative">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold mb-8 uppercase tracking-widest">
              <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block"></span>
              Get Started Today
            </div>
            <h2 class="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Start Growing Your<br>
              <span class="text-gold">Affiliate Revenue Today</span>
            </h2>
            <p class="text-gray-400 text-lg max-w-lg mx-auto mb-10">
              Launch your personalized affiliate storefront in minutes. Free forever.
            </p>
            <button
              class="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gold text-black font-bold text-base hover:bg-gold-bright transition-all duration-200 disabled:opacity-50"
              style="box-shadow: 0 0 50px rgba(201,168,76,0.35);"
              @click="signIn"
              :disabled="loading"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Create Your Bestalink
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <p class="mt-4 text-sm text-gray-600">No credit card required · Free forever</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer class="border-t border-surface-border py-8 px-6">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center">
          <span class="text-gold font-extrabold">Besta</span>
          <span class="text-white font-extrabold">link</span>
          <span class="text-gray-600 text-sm ml-3">© 2025</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-gray-600">
          <a href="#" class="hover:text-gray-400 transition-colors duration-200">Privacy</a>
          <a href="#" class="hover:text-gray-400 transition-colors duration-200">Terms</a>
          <a href="#" class="hover:text-gray-400 transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'Bestalink — Build Your Affiliate Storefront in Minutes',
  meta: [
    { name: 'description', content: 'Create a beautiful personalized affiliate link page, showcase your products, track clicks, and grow your earnings. Free forever.' },
    { property: 'og:title', content: 'Bestalink — Affiliate Link Management Platform' },
    { property: 'og:description', content: 'Turn your audience into customers with one beautiful affiliate page.' },
  ],
})

const supabase = useSupabaseClient()
const loading = ref(false)
const config = useRuntimeConfig()
const openFaq = ref<number | null>(null)

const trustItems = ['Fast Setup', 'Google Sign-In', 'Mobile Friendly', 'Analytics Included']

const mockProducts = [
  { name: 'Gold Body Serum', desc: 'Luxury moisturizer', gradient: 'linear-gradient(135deg, #F59E0B, #B45309)' },
  { name: 'Glow Kit Bundle', desc: 'Complete skincare set', gradient: 'linear-gradient(135deg, #A855F7, #7C3AED)' },
  { name: 'Signature Perfume', desc: 'Exclusive fragrance', gradient: 'linear-gradient(135deg, #14B8A6, #0891B2)' },
]

const phoneStats = [
  { value: '1.2K', label: 'Views' },
  { value: '847', label: 'Clicks' },
  { value: '70%', label: 'CTR' },
]

const platforms = [
  { name: 'TikTok', abbr: 'TK', color: '#010101' },
  { name: 'YouTube', abbr: 'YT', color: '#FF0000' },
  { name: 'Instagram', abbr: 'IG', color: '#E1306C' },
  { name: 'Twitter / X', abbr: 'X', color: '#1DA1F2' },
  { name: 'Pinterest', abbr: 'PI', color: '#E60023' },
]

const heroStats = [
  { value: '5,000+', label: 'Active Creators' },
  { value: '2.1M+', label: 'Link Clicks Tracked' },
  { value: '$850K+', label: 'Earned by Creators' },
]

const showcaseProducts = [
  { name: 'Gold Body Serum', desc: 'Luxury moisturizer with 24k gold', emoji: '✨', gradient: 'linear-gradient(135deg, #F59E0B, #B45309)' },
  { name: 'Glow Kit Bundle', desc: 'Complete skincare system', emoji: '💎', gradient: 'linear-gradient(135deg, #A855F7, #7C3AED)' },
  { name: 'Signature Perfume', desc: 'Exclusive designer fragrance', emoji: '🌸', gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)' },
]

const featureCards = [
  {
    icon: '🔗',
    title: 'Custom Link Page',
    description: 'Get your own personalized URL instantly. Share it anywhere and let your audience discover all your products in one beautiful place.',
    tag: 'bestalink.com/yourname',
  },
  {
    icon: '🔐',
    title: 'Google Sign-In',
    description: 'No passwords to remember. Sign in securely with your Google account in one click and start building your page immediately.',
    tag: null,
  },
  {
    icon: '🎨',
    title: 'Brand Customization',
    description: 'Make your page truly yours. Customize your background color, button color, and brand appearance to perfectly match your style.',
    tag: null,
  },
  {
    icon: '📦',
    title: 'Product Management',
    description: 'Add up to 50 affiliate products. Create, edit, enable, or disable products from your dashboard with a few simple clicks.',
    tag: 'Up to 50 products',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Track page views, individual link clicks, and overall performance. Understand what your audience loves and optimize accordingly.',
    tag: null,
  },
  {
    icon: '📱',
    title: 'Mobile Optimized',
    description: 'Your page looks stunning on every device. Perfectly responsive design ensures a premium experience on phones, tablets, and desktops.',
    tag: null,
  },
]

const dashStats = [
  { label: 'Total Views', value: '12,847', change: '+23% this week' },
  { label: 'Total Clicks', value: '8,291', change: '+18% this week' },
  { label: 'Products', value: '24', change: '+4 this month' },
  { label: 'Click Rate', value: '64.5%', change: '+5% this week' },
]

const topLinks = [
  { name: 'Gold Body Serum', color: 'linear-gradient(135deg, #F59E0B, #B45309)', clicks: '2,847 clicks', pct: 92 },
  { name: 'Glow Kit Bundle', color: 'linear-gradient(135deg, #A855F7, #7C3AED)', clicks: '1,932 clicks', pct: 68 },
  { name: 'Signature Perfume', color: 'linear-gradient(135deg, #EC4899, #F43F5E)', clicks: '1,204 clicks', pct: 45 },
]

const steps = [
  {
    emoji: '🔑',
    title: 'Sign in with Google',
    description: 'Create your account in seconds using your existing Google account. No password needed, no forms to fill out.',
  },
  {
    emoji: '✏️',
    title: 'Choose your username',
    description: 'Pick a unique username and instantly claim your personalized URL at bestalink.com/yourname.',
  },
  {
    emoji: '🎨',
    title: 'Customize your page',
    description: 'Set your brand colors, upload a profile photo, and write your bio to make the page authentically yours.',
  },
  {
    emoji: '📦',
    title: 'Add your products',
    description: 'Add affiliate products with names, descriptions, and your affiliate links. Manage up to 50 products.',
  },
  {
    emoji: '🔗',
    title: 'Share your link',
    description: 'Drop your Bestalink URL in your TikTok bio, YouTube description, Instagram profile, or anywhere you create.',
  },
  {
    emoji: '📈',
    title: 'Track your earnings',
    description: 'Monitor page views and link clicks in real time. See exactly which products drive the most revenue.',
  },
]

const bestaItems = [
  'Affiliate-focused design',
  'Beautiful product showcase',
  'Click & view analytics',
  'Full brand customization',
  'Up to 50 products',
  'Google Sign-In (no password)',
  'Mobile optimized',
  'Premium dark design',
]

const genericItems = [
  'Basic link listing only',
  'No product showcase',
  'Limited or no analytics',
  'Generic template appearance',
  'Limited product capacity',
  'Password & account setup required',
  'Poor mobile experience',
  'Outdated design patterns',
]

const faqs = [
  {
    q: 'Is Bestalink free?',
    a: 'Yes, Bestalink is completely free to use. Create your account, set up your personalized page, and start showcasing affiliate products — all at no cost, with no credit card required.',
  },
  {
    q: 'Can I customize my page?',
    a: 'Absolutely. You can customize your background color, button color, and overall brand appearance to match your personal style and brand identity.',
  },
  {
    q: 'How many products can I add?',
    a: 'You can add up to 50 affiliate products to your Bestalink page. Each product can have a name, description, and your unique affiliate link.',
  },
  {
    q: 'Do I need any coding knowledge?',
    a: 'Not at all. Bestalink is designed for creators, not developers. Set up your professional affiliate storefront in minutes using our intuitive dashboard — no technical skills required.',
  },
  {
    q: 'Can I use affiliate links from any program?',
    a: 'Yes! Bestalink works with any affiliate program — Amazon Associates, ShareASale, ClickBank, Impact, Rakuten, or any custom affiliate link you have.',
  },
  {
    q: 'Can I track clicks and performance?',
    a: 'Yes. Your Bestalink dashboard shows you real-time page views, individual product click counts, and performance trends so you can optimize your content strategy.',
  },
]

async function signIn() {
  loading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${config.public.appUrl}/auth/callback`,
    },
  })
  if (error) {
    console.error(error)
    loading.value = false
  }
}

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
