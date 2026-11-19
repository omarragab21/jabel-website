<template>
  <div class="home-view" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
    <!-- 1. Hero Section (Home Banner Multi-Slide Carousel) -->
    <!-- Shimmer while /v1/site/sliders loads: the hero has no built-in content. -->
    <div v-if="slidersLoading" class="hero-banner-wrapper" role="status" aria-busy="true" :aria-label="currentLang === 'ar' ? 'جاري التحميل' : 'Loading'">
      <section class="hero-section">
        <div class="hero-container hero-skeleton">
          <div class="hero-content">
            <span class="sk sk-title"></span>
            <span class="sk sk-title sk-title-short"></span>
            <span class="sk sk-desc"></span>
            <span class="sk sk-desc sk-desc-short"></span>
            <span class="sk sk-btn"></span>
          </div>
        </div>
      </section>
    </div>
    <div 
      v-else-if="displayHeroSlides.length > 0"
      class="hero-banner-wrapper"
      @mouseenter="stopHeroAutoplay"
      @mouseleave="startHeroAutoplay"
    >
      <section class="hero-section">
        <!-- Background Slides Carousel -->
        <transition-group :name="heroTransitionName" tag="div" class="hero-slides-wrapper">
          <div 
            v-for="(slide, idx) in displayHeroSlides" 
            :key="slide.id"
            v-show="currentHeroIndex === idx"
            class="hero-slide-item"
          >
            <div class="hero-bg" :style="slide.image ? { backgroundImage: `url(${slide.image})` } : {}"></div>
            <div class="hero-overlay"></div>
            
            <div class="hero-container">
              <div class="hero-content">
                <h1 class="hero-title">
                  {{ slide.title }}
                  <template v-if="slide.title_sub">
                    <br>
                    <span class="hero-title-sub">{{ slide.title_sub }}</span>
                  </template>
                </h1>
                <p v-if="slide.description" class="hero-desc">{{ slide.description }}</p>
                <div class="hero-actions">
                  <a
                    v-if="resolveLink(slide.link).external"
                    :href="resolveLink(slide.link).href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hero-btn-white"
                    @click.stop
                  >
                    {{ slide.button_text }}
                  </a>
                  <router-link v-else :to="resolveLink(slide.link).href" class="hero-btn-white" @click.stop>
                    {{ slide.button_text }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Carousel Navigation Controls (Arrows) -->
        <template v-if="displayHeroSlides.length > 1">
          <!-- Right Arrow -->
          <button 
            type="button"
            class="hero-nav-arrow hero-arrow-right" 
            @click="currentLang === 'ar' ? prevHeroSlide() : nextHeroSlide()" 
            :aria-label="currentLang === 'ar' ? 'السابق' : 'Next'"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <!-- Left Arrow -->
          <button 
            type="button"
            class="hero-nav-arrow hero-arrow-left" 
            @click="currentLang === 'ar' ? nextHeroSlide() : prevHeroSlide()" 
            :aria-label="currentLang === 'ar' ? 'التالي' : 'Previous'"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <!-- Indicators / Dots -->
          <div class="hero-indicators">
            <button
              v-for="(slide, idx) in displayHeroSlides"
              :key="idx"
              type="button"
              class="hero-dot"
              :class="{ active: currentHeroIndex === idx }"
              @click="goToHeroSlide(idx)"
              :aria-label="`Slide ${idx + 1}`"
            ></button>
          </div>
        </template>
      </section>
    </div>

    <!-- 2. Trust Bar (Features directly below Hero) - hidden (commented out)
    <section class="trust-bar-section">
      <div class="container trust-bar-container">
        <div class="trust-item" v-for="(feat, idx) in trustFeatures" :key="idx">
          <div class="trust-icon-box">
            <svg v-if="feat.id === 'quality'" width="20" height="20" viewBox="1093 34 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1107.81 41.8983C1108.17 41.7715 1108.36 41.3786 1108.23 41.0207C1108.1 40.6628 1107.71 40.4754 1107.35 40.6022C1106.59 40.8733 1105.84 41.3956 1105.18 41.9794C1104.51 42.5695 1103.87 43.2571 1103.33 43.9036C1102.85 44.4861 1102.43 45.0436 1102.12 45.4806C1101.8 45.053 1101.49 44.7655 1101.2 44.574C1101.18 44.5583 1101.16 44.5422 1101.13 44.526C1100.92 44.3829 1100.7 44.2294 1100.25 44.2294C1099.87 44.2294 1099.56 44.5372 1099.56 44.9169C1099.56 45.2813 1099.85 45.5795 1100.2 45.6029C1100.21 45.6037 1100.21 45.6049 1100.22 45.6066C1100.25 45.6159 1100.33 45.6433 1100.44 45.7181C1100.66 45.8667 1101.05 46.2226 1101.47 47.0577C1101.58 47.2793 1101.8 47.4242 1102.05 47.4368C1102.3 47.4495 1102.53 47.3278 1102.66 47.1188C1102.75 46.9962 1102.99 46.6326 1103.14 46.4162C1103.45 45.9828 1103.88 45.3967 1104.39 44.7844C1104.9 44.1705 1105.48 43.5404 1106.09 43.0132C1106.69 42.4798 1107.28 42.0855 1107.81 41.8983Z" fill="currentColor"/>
              <path d="M1103 34.1459C1101.46 34.1459 1100.2 34.6665 1099.11 35.2326C1098.78 35.4037 1098.47 35.5729 1098.18 35.7347C1097.46 36.1303 1096.83 36.481 1096.13 36.7037L1096.11 36.7112C1095.7 36.842 1095.36 36.9504 1095.1 37.0513C1094.86 37.1463 1094.57 37.2765 1094.36 37.5036C1094.18 37.7077 1094.09 37.9367 1094.02 38.1558C1093.97 38.3547 1093.92 38.5959 1093.88 38.8543L1093.87 38.8823C1092.74 45.1759 1095.22 51.1381 1101.28 53.4581L1101.31 53.4697C1101.9 53.6978 1102.31 53.8542 1103 53.8542C1103.69 53.8542 1104.1 53.6978 1104.69 53.4696L1104.72 53.4581C1110.78 51.138 1113.26 45.1756 1112.13 38.8823L1112.12 38.8542C1112.08 38.5958 1112.03 38.3546 1111.98 38.1557C1111.91 37.9366 1111.82 37.7075 1111.63 37.5034C1111.43 37.2763 1111.14 37.1462 1110.9 37.0512C1110.64 36.9503 1110.3 36.842 1109.89 36.7112L1109.87 36.7038C1109.17 36.481 1108.53 36.1303 1107.82 35.7345C1107.52 35.5729 1107.22 35.4037 1106.89 35.2326C1105.79 34.6665 1104.54 34.1459 1103 34.1459ZM1096.55 38.0137C1097.38 37.747 1098.2 37.2977 1098.96 36.8778C1099.23 36.7296 1099.49 36.5851 1099.74 36.4535C1100.76 35.9256 1101.78 35.5209 1103 35.5209C1104.21 35.5209 1105.23 35.9257 1106.25 36.4536C1106.51 36.5852 1106.77 36.7297 1107.04 36.8779C1107.8 37.2978 1108.62 37.7471 1109.45 38.0138C1109.89 38.1538 1110.19 38.2489 1110.4 38.3315C1110.54 38.3859 1110.6 38.4202 1110.62 38.4317C1110.62 38.4463 1110.64 38.4765 1110.65 38.5331C1110.69 38.6579 1110.72 38.8302 1110.77 39.1264C1111.82 44.9254 1109.54 50.1426 1104.23 52.174C1103.62 52.4072 1103.42 52.4792 1103 52.4792C1102.58 52.4792 1102.38 52.4072 1101.77 52.174C1096.46 50.1426 1094.18 44.9252 1095.23 39.1263C1095.28 38.8302 1095.31 38.658 1095.35 38.5332C1095.36 38.4766 1095.38 38.4464 1095.38 38.4318C1095.4 38.4204 1095.46 38.386 1095.6 38.3316C1095.81 38.2489 1096.11 38.1538 1096.55 38.0137Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
            </svg>
            <svg v-else-if="feat.id === 'authentic'" width="20" height="20" viewBox="918 34 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M926.319 46.6566C926.445 46.8573 926.665 46.9783 926.901 46.9783L926.902 46.9792C926.908 46.9792 926.915 46.979 926.921 46.9788C926.928 46.9785 926.934 46.9783 926.94 46.9783C927.191 46.9636 927.413 46.8151 927.522 46.5896C927.536 46.5566 929.101 43.3428 931.069 42.318C931.406 42.142 931.537 41.7267 931.362 41.3903C931.186 41.053 930.77 40.9228 930.434 41.0979C928.779 41.9586 927.45 43.9221 926.772 45.0854C926.202 44.5556 925.616 44.2329 925.58 44.2136C925.246 44.0321 924.83 44.1559 924.649 44.4886C924.467 44.8214 924.589 45.2385 924.922 45.4209C924.922 45.421 924.923 45.4215 924.924 45.4223C924.979 45.4529 925.886 45.9668 926.319 46.6566Z" fill="currentColor"/>
              <path d="M925.675 52.4335C926.232 53.033 926.994 53.8533 928.001 53.8533C929.007 53.8533 929.77 53.033 930.327 52.4335L930.343 52.4162C930.438 52.3144 930.528 52.218 930.609 52.1373C931.116 51.6313 931.362 51.5287 932.078 51.5287C932.184 51.5287 932.297 51.5321 932.414 51.5356L932.426 51.536C933.176 51.558 934.204 51.5873 934.893 50.9044C935.588 50.2151 935.559 49.1801 935.537 48.4248L935.536 48.4124C935.533 48.2958 935.529 48.1828 935.529 48.0774C935.529 47.3615 935.639 47.1067 936.187 46.5594C937.262 45.4851 937.854 44.892 937.854 44C937.854 43.1082 937.262 42.516 936.187 41.4409C935.641 40.8936 935.529 40.6386 935.529 39.9227C935.529 39.8174 935.533 39.7043 935.536 39.5877L935.537 39.5753C935.559 38.8191 935.588 37.7851 934.893 37.0948C934.205 36.4133 933.181 36.442 932.431 36.4631L932.427 36.4632L932.409 36.4638C932.294 36.4672 932.183 36.4706 932.078 36.4706C931.451 36.4706 931.04 36.2927 930.56 35.8133C929.486 34.7381 928.893 34.1459 928.001 34.1459C927.109 34.1459 926.517 34.738 925.442 35.8132C924.962 36.2926 924.551 36.4706 923.924 36.4706C923.818 36.4706 923.707 36.4672 923.591 36.4637L923.576 36.4632C922.82 36.4412 921.786 36.4119 921.096 37.1067C920.413 37.7961 920.442 38.8237 920.464 39.5735L920.465 39.5908C920.468 39.7065 920.471 39.817 920.471 39.9218C920.471 40.5488 920.294 40.9604 919.814 41.4398C918.739 42.5142 918.147 43.1072 918.147 43.9991C918.147 44.8911 918.739 45.4832 919.814 46.5585C920.36 47.1057 920.471 47.3606 920.471 48.0765C920.471 48.1819 920.468 48.2951 920.464 48.4118L920.464 48.4239C920.442 49.1792 920.413 50.2142 921.108 50.9044C921.798 51.5873 922.825 51.558 923.576 51.536L923.588 51.5356C923.705 51.5321 923.818 51.5287 923.924 51.5287C924.639 51.5287 924.887 51.6304 925.393 52.1364C925.478 52.2216 925.574 52.3244 925.675 52.4335ZM926.365 51.1638C925.598 50.3993 925.005 50.1537 923.924 50.1537L923.922 50.1527C923.804 50.1527 923.679 50.1561 923.55 50.1596L923.535 50.1601C923.004 50.1756 922.345 50.194 922.075 49.9263C921.803 49.6559 921.822 48.9941 921.837 48.4615L921.838 48.4467C921.841 48.3172 921.845 48.1921 921.845 48.0746C921.845 46.993 921.572 46.3742 920.784 45.585L920.773 45.5742C919.991 44.7914 919.52 44.3194 919.52 43.9973C919.52 43.6737 919.996 43.198 920.784 42.4098C921.517 41.6774 921.845 40.9091 921.845 39.92C921.845 39.8024 921.841 39.6781 921.838 39.5487L921.837 39.5313C921.822 39.0024 921.802 38.3433 922.071 38.0729C922.341 37.8016 923.003 37.8199 923.536 37.8355L923.551 37.8359C923.68 37.8394 923.805 37.8428 923.923 37.8428C924.911 37.8428 925.679 37.5156 926.412 36.7822C927.201 35.9939 927.676 35.5181 928 35.5181C928.324 35.5181 928.799 35.9938 929.588 36.7821C930.32 37.5154 931.088 37.8428 932.077 37.8428C932.195 37.8428 932.319 37.8394 932.448 37.8359L932.466 37.8355C932.995 37.8199 933.654 37.8007 933.924 38.0692C934.196 38.3397 934.177 39.0015 934.162 39.5341L934.161 39.5492C934.158 39.6786 934.154 39.8035 934.154 39.9209C934.154 41.0025 934.427 41.6213 935.215 42.4106L935.226 42.421C936.008 43.204 936.479 43.6761 936.479 43.9983C936.479 44.3218 936.018 44.7838 935.215 45.5859C934.412 46.388 934.154 46.993 934.154 48.0756C934.154 48.1929 934.158 48.3179 934.161 48.4473L934.162 48.4624C934.177 48.9941 934.197 49.6559 933.924 49.9263C933.654 50.1949 932.994 50.1756 932.464 50.1601L932.449 50.1596C932.32 50.1561 932.195 50.1527 932.077 50.1527C930.996 50.1527 930.403 50.3984 929.636 51.1638C929.539 51.2606 929.442 51.3654 929.339 51.4761L929.316 51.5006C928.932 51.9137 928.407 52.4774 928.001 52.4774C927.594 52.4774 927.067 51.9109 926.682 51.4966C926.666 51.4801 926.651 51.4637 926.636 51.4474C926.543 51.348 926.454 51.2528 926.365 51.1638Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
            </svg>
            <svg v-else-if="feat.id === 'payment'" width="20" height="20" viewBox="739 34 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M746.708 41.0282V41.9434C745.825 42.2274 745.346 42.973 745.214 43.5032C745.17 43.679 745.147 43.916 745.132 44.1392C745.116 44.3771 745.108 44.6515 745.105 44.9279C745.1 45.4744 745.116 46.0669 745.153 46.4333L745.158 46.4885L745.172 46.5421C745.47 47.6593 746.257 48.1613 747.008 48.3145L747.046 48.3223L747.085 48.3257C747.531 48.3654 749.096 48.3599 749.934 48.357L749.936 48.357C750.1 48.3564 750.235 48.356 750.329 48.3559C750.85 48.3648 751.386 48.2735 751.849 47.9679C752.325 47.6533 752.641 47.1673 752.813 46.5489L752.823 46.5139L752.829 46.478C752.867 46.2508 752.893 45.6611 752.897 45.1041C752.898 44.8139 752.894 44.5108 752.88 44.2405C752.866 43.9844 752.842 43.7102 752.79 43.5032L752.784 43.4782L752.776 43.4537C752.492 42.5971 751.899 42.1451 751.306 41.9495V41.0282C751.306 39.7585 750.277 38.7292 749.007 38.7292C747.737 38.7292 746.708 39.7585 746.708 41.0282ZM749.007 40.1042C748.497 40.1042 748.083 40.5179 748.083 41.0282V41.8274H749.931V41.0282C749.931 40.5179 749.518 40.1042 749.007 40.1042ZM747.476 43.2024C746.876 43.2024 746.601 43.624 746.548 43.8367C746.537 43.8809 746.518 44.0082 746.504 44.2285C746.491 44.434 746.483 44.6821 746.48 44.942C746.475 45.4352 746.489 45.9364 746.515 46.2389C746.593 46.499 746.71 46.6539 746.823 46.7523C746.939 46.8535 747.082 46.9209 747.246 46.9593C747.672 46.989 749.04 46.9847 749.871 46.982C750.059 46.9814 750.22 46.9809 750.336 46.9809L750.348 46.9811C750.706 46.9878 750.938 46.9218 751.091 46.8203C751.228 46.7299 751.374 46.5652 751.477 46.2209C751.494 46.0729 751.518 45.6215 751.522 45.0957C751.523 44.8222 751.519 44.5478 751.507 44.3128C751.495 44.0876 751.477 43.9361 751.461 43.8588C751.281 43.3516 750.884 43.2024 750.556 43.2024H747.476Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
              <path d="M748.998 34.1459C747.457 34.1459 746.204 34.6665 745.111 35.2326C744.781 35.4037 744.474 35.5729 744.181 35.7347C743.464 36.1303 742.828 36.481 742.13 36.7037L742.107 36.7112C741.697 36.842 741.357 36.9504 741.099 37.0513C740.857 37.1463 740.569 37.2765 740.365 37.5036C740.181 37.7077 740.087 37.9367 740.024 38.1558C739.967 38.3547 739.924 38.5959 739.877 38.8543L739.872 38.8823C738.738 45.1759 741.219 51.1382 747.279 53.4581L747.309 53.4697C747.904 53.6978 748.313 53.8542 749.001 53.8542C749.69 53.8542 750.098 53.6977 750.694 53.4696L750.724 53.4581C756.783 51.138 759.262 45.1756 758.127 38.8823L758.122 38.8542C758.076 38.5958 758.032 38.3546 757.975 38.1557C757.913 37.9366 757.818 37.7075 757.635 37.5034C757.43 37.2763 757.142 37.1462 756.9 37.0512C756.642 36.9503 756.302 36.842 755.892 36.7112L755.869 36.7038C755.171 36.481 754.534 36.1303 753.817 35.7345C753.523 35.5729 753.216 35.4037 752.886 35.2326C751.793 34.6665 750.539 34.1459 748.998 34.1459ZM742.548 38.0137C743.384 37.747 744.198 37.2977 744.959 36.8778C745.228 36.7296 745.49 36.5851 745.744 36.4535C746.763 35.9256 747.782 35.5209 748.998 35.5209C750.214 35.5209 751.234 35.9257 752.254 36.4536C752.508 36.5852 752.77 36.7297 753.039 36.8779C753.8 37.2978 754.615 37.7471 755.451 38.0138C755.891 38.1538 756.187 38.2489 756.398 38.3315C756.537 38.3859 756.598 38.4202 756.617 38.4317C756.624 38.4463 756.637 38.4765 756.653 38.5331C756.689 38.6579 756.721 38.8302 756.774 39.1264C757.82 44.9254 755.538 50.1426 750.232 52.174C749.623 52.4072 749.423 52.4792 749.001 52.4792C748.579 52.4792 748.379 52.4072 747.77 52.174C742.464 50.1426 740.18 44.9252 741.225 39.1263C741.279 38.8302 741.311 38.658 741.346 38.5332C741.362 38.4766 741.375 38.4464 741.382 38.4318C741.402 38.4204 741.462 38.386 741.601 38.3316C741.812 38.2489 742.109 38.1538 742.548 38.0137ZM741.387 38.4225C741.389 38.421 741.389 38.42 741.389 38.4199C741.389 38.4199 741.389 38.4201 741.389 38.4207C741.388 38.4211 741.388 38.4217 741.387 38.4225Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
            </svg>
            <svg v-else-if="feat.id === 'delivery'" width="20" height="20" viewBox="590 34 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M600.179 37.455C599.894 37.3626 599.519 37.3541 598.442 37.3541H590.833C590.454 37.3541 590.146 37.0463 590.146 36.6666C590.146 36.2869 590.454 35.9791 590.833 35.9791L598.569 35.979C599.469 35.9787 600.084 35.9784 600.604 36.1473C601.462 36.4261 602.168 37.0278 602.582 37.8123L603.995 37.8123C604.633 37.8123 605.163 37.8123 605.599 37.8563C606.058 37.9027 606.469 38.002 606.858 38.2338C607.246 38.4657 607.528 38.7808 607.787 39.1631C608.032 39.5262 608.283 39.9925 608.586 40.5542L609.767 42.7474C609.794 42.7965 609.816 42.8492 609.831 42.9048C609.848 42.968 609.855 43.0324 609.854 43.0961V44.9658C609.854 46.0042 609.854 46.8528 609.764 47.5228C609.67 48.223 609.466 48.8302 608.982 49.3148C608.464 49.8328 607.802 50.0326 607.028 50.1173C606.753 51.211 605.763 52.0207 604.583 52.0207C603.429 52.0207 602.457 51.2454 602.157 50.1874H597.843C597.543 51.2454 596.571 52.0207 595.417 52.0207C594.237 52.0207 593.247 51.211 592.972 50.1173C592.198 50.0326 591.536 49.8328 591.018 49.3148C590.376 48.6724 590.223 47.8089 590.172 46.7841C590.153 46.4049 590.445 46.0822 590.824 46.0633C591.204 46.0444 591.526 46.3364 591.545 46.7157C591.594 47.7016 591.741 48.0924 591.991 48.3426C592.182 48.5337 592.455 48.6641 593.013 48.7369C593.337 47.7176 594.29 46.979 595.417 46.979C596.571 46.979 597.543 47.7543 597.843 48.8124H602.157C602.457 47.7543 603.429 46.979 604.583 46.979C605.71 46.979 606.663 47.7176 606.987 48.7369C607.545 48.6641 607.818 48.5337 608.009 48.3426C608.196 48.156 608.328 47.8874 608.401 47.3395C608.478 46.7719 608.479 46.0163 608.479 44.9166V43.7707L604.751 43.7708C604.174 43.7712 603.728 43.7716 603.346 43.6474C602.579 43.398 601.977 42.7963 601.728 42.0289C601.603 41.6465 601.604 41.2005 601.604 40.6241L601.604 40.5166C601.604 39.4394 601.596 39.0638 601.503 38.7792C601.299 38.1513 600.807 37.659 600.179 37.455ZM608.016 42.3957L607.391 41.2362C607.069 40.6368 606.85 40.2322 606.648 39.9334C606.454 39.6474 606.307 39.5067 606.153 39.4143C605.998 39.3219 605.804 39.2591 605.461 39.2244C605.102 39.1881 604.642 39.1873 603.961 39.1873H602.956C602.98 39.5284 602.979 39.92 602.979 40.3891L602.979 40.5166C602.979 41.2525 602.988 41.4575 603.035 41.604C603.149 41.9528 603.422 42.2263 603.771 42.3397C603.917 42.3873 604.122 42.3957 604.858 42.3957L608.016 42.3957ZM594.271 49.4998C594.271 48.867 594.784 48.354 595.417 48.354C596.05 48.354 596.563 48.867 596.563 49.4998C596.563 50.1327 596.05 50.6457 595.417 50.6457C594.784 50.6457 594.271 50.1327 594.271 49.4998ZM603.438 49.4998C603.438 48.867 603.951 48.354 604.583 48.354C605.216 48.354 605.729 48.867 605.729 49.4998C605.729 50.1327 605.216 50.6457 604.583 50.6457C603.951 50.6457 603.438 50.1327 603.438 49.4998Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
              <path d="M590.833 39.6457C590.454 39.6457 590.146 39.9535 590.146 40.3332C590.146 40.7129 590.454 41.0207 590.833 41.0207H596.333C596.713 41.0207 597.021 40.7129 597.021 40.3332C597.021 39.9535 596.713 39.6457 596.333 39.6457H590.833Z" fill="currentColor"/>
              <path d="M590.146 43.0832C590.146 42.7035 590.454 42.3957 590.833 42.3957H594.5C594.88 42.3957 595.188 42.7035 595.188 43.0832C595.188 43.4629 594.88 43.7707 594.5 43.7707H590.833C590.454 43.7707 590.146 43.4629 590.146 43.0832Z" fill="currentColor"/>
            </svg>
            <svg v-else-if="feat.id === 'consult'" width="20" height="20" viewBox="420 34 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M430 35.5209C426.241 35.5209 423.354 38.1693 423.354 41.25V41.4936C423.473 41.4782 423.599 41.4746 423.733 41.4855C424.061 41.512 424.374 41.6552 424.707 41.8075L424.784 41.8427L424.844 41.8699C425.094 41.9833 425.339 42.0943 425.534 42.2641C426.105 42.7607 426.105 43.4161 426.104 43.795V47.872C426.105 48.251 426.105 48.9064 425.534 49.403C425.339 49.5727 425.094 49.6836 424.845 49.7969L424.784 49.8244L424.707 49.8596C424.375 50.0117 424.061 50.1551 423.733 50.1817C422.775 50.2591 422.239 49.6057 421.924 49.2218L421.898 49.1905C421.818 49.0934 421.719 48.9794 421.613 48.8563C421.419 48.6312 421.199 48.3757 421.017 48.1378C420.716 47.7447 420.415 47.2737 420.266 46.7265C420.106 46.1405 420.106 45.5267 420.266 44.9406C420.374 44.5435 420.571 44.1931 420.83 43.8252C421.081 43.4693 421.418 43.059 421.836 42.5518L421.854 42.5302C421.871 42.5095 421.889 42.4876 421.907 42.4647C421.93 42.4368 421.954 42.407 421.979 42.3765V41.25C421.979 37.2432 425.659 34.1459 430 34.1459C434.341 34.1459 438.021 37.2432 438.021 41.25V42.3719C438.04 42.3955 438.057 42.4182 438.074 42.4391L438.076 42.4421C438.106 42.48 438.131 42.5117 438.146 42.53L438.163 42.5506C438.581 43.0583 438.919 43.4688 439.17 43.825C439.429 44.1929 439.626 44.5433 439.734 44.9404C439.894 45.5265 439.894 46.1403 439.734 46.7263C439.585 47.2735 439.284 47.7445 438.983 48.1376C438.801 48.3756 438.581 48.631 438.387 48.8561C438.281 48.9792 438.182 49.0932 438.102 49.1903L438.049 49.2546C438.038 49.268 438.027 49.2814 438.017 49.2947C437.981 50.313 437.73 51.1496 437.269 51.8175C436.769 52.5407 436.066 53.0012 435.283 53.2948C433.791 53.8545 431.854 53.8544 430.086 53.8542H430C429.62 53.8542 429.313 53.5464 429.313 53.1667C429.313 52.787 429.62 52.4792 430 52.4792C431.876 52.4792 433.567 52.4698 434.8 52.0073C435.392 51.7854 435.836 51.4723 436.138 51.0355C436.295 50.8082 436.426 50.53 436.515 50.185C436.433 50.1893 436.35 50.1882 436.267 50.1815C435.939 50.1549 435.626 50.0119 435.294 49.8599L435.216 49.8242L435.156 49.7973C434.83 49.6515 434.214 49.3765 433.98 48.6825C433.894 48.43 433.895 48.1602 433.896 47.9092L433.896 47.8459V43.8207L433.896 43.7576C433.895 43.5065 433.894 43.2366 433.98 42.9843C434.214 42.2903 434.83 42.0153 435.156 41.8694C435.177 41.8599 435.197 41.851 435.216 41.8425L435.293 41.8073C435.626 41.6551 435.939 41.5118 436.267 41.4853C436.393 41.4751 436.52 41.4778 436.646 41.4932V41.25C436.646 38.1693 433.76 35.5209 430 35.5209ZM436.767 43.0152C436.711 42.956 436.673 42.9269 436.647 42.9122C436.571 42.8698 436.476 42.8478 436.378 42.8558C436.323 42.8602 436.247 42.8837 435.786 43.0938C435.585 43.1856 435.471 43.2384 435.384 43.3016C435.318 43.3498 435.296 43.3836 435.283 43.4237C435.281 43.4286 435.278 43.4466 435.276 43.489C435.271 43.5599 435.271 43.6542 435.271 43.8207V47.8459C435.271 48.0126 435.271 48.1069 435.276 48.1777C435.278 48.2201 435.281 48.2382 435.283 48.243C435.296 48.2832 435.318 48.3169 435.384 48.3651C435.471 48.4284 435.585 48.4812 435.786 48.5729C436.247 48.783 436.323 48.8065 436.378 48.8109C436.476 48.8189 436.571 48.797 436.647 48.7545C436.681 48.735 436.728 48.6959 437.041 48.3163C437.165 48.1651 437.281 48.0312 437.393 47.9021L437.401 47.8938C437.568 47.7004 437.727 47.5174 437.891 47.3028C438.148 46.9667 438.326 46.6614 438.408 46.3639C438.503 46.0151 438.503 45.6516 438.408 45.3028C438.358 45.1208 438.259 44.9191 438.046 44.617C437.829 44.3079 437.524 43.9371 437.085 43.4039C437.022 43.3277 436.981 43.2746 436.945 43.2282C436.919 43.1946 436.896 43.1646 436.869 43.1318C436.831 43.0969 436.797 43.0578 436.767 43.0152ZM423.346 42.9402C423.223 43.0319 423.109 43.1694 422.915 43.4041C422.476 43.9372 422.172 44.3081 421.954 44.6171C421.741 44.9193 421.642 45.1209 421.592 45.303C421.497 45.6518 421.497 46.0153 421.592 46.3641C421.674 46.6616 421.852 46.9669 422.109 47.303C422.274 47.5186 422.433 47.7024 422.602 47.8968L422.603 47.8977C422.716 48.0282 422.833 48.1636 422.959 48.3165C423.138 48.5336 423.249 48.6586 423.36 48.7374C423.442 48.7957 423.511 48.8201 423.622 48.8111C423.677 48.8067 423.753 48.7832 424.214 48.5731C424.566 48.413 424.608 48.386 424.632 48.3654C424.673 48.3297 424.69 48.3002 424.703 48.2448C424.724 48.1629 424.729 48.0543 424.729 47.8461V43.8209C424.729 43.6128 424.724 43.5041 424.703 43.4224C424.69 43.3669 424.673 43.3374 424.632 43.3017C424.608 43.281 424.566 43.2541 424.214 43.094C423.753 42.8839 423.677 42.8604 423.622 42.856C423.509 42.8468 423.436 42.8726 423.346 42.9402Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
            </svg>
          </div>
          <span class="trust-title">{{ feat.title }}</span>
        </div>
      </div>
    </section>
    -->

    <!-- 3. Shop by Category (تسوق حسب التصنيف) -->
    <CategoryCarousel :categories="homeCategories" :loading="categoriesLoading" :title="homeCategoryTitle" />

    <!-- 4. Product lists from the dashboard (Settings > Homepage): the first one sits above the offers.
         Until the settings are known, one skeleton list stands in (no built-in lists or titles). -->
    <section v-if="!homeSettingsReady" class="home-section product-list-section container" aria-busy="true">
      <div class="section-header-flex">
        <div class="section-title-wrap">
          <span class="sk-shimmer sk-line section-title-skeleton" aria-hidden="true"></span>
        </div>
      </div>
      <div class="products-grid-four">
        <ProductCardSkeleton v-for="n in 4" :key="`sk-lead-${n}`" />
      </div>
    </section>
    <section
      v-for="section in (homeSettingsReady ? leadSections : [])"
      :key="section.id"
      v-show="productsLoading || sectionProducts(section).length"
      class="home-section product-list-section container"
      :data-testid="`home-section-${section.id}`"
    >
      <div class="section-header-flex">
        <div class="section-title-wrap">
          <h2 v-if="sectionTitle(section)" class="section-title">{{ sectionTitle(section) }}</h2>
        </div>
        <router-link v-if="!productsLoading && sectionHasMore(section)" :to="sectionViewAllLink(section)" class="view-all-link">
          <span>{{ t('home.view_all') }}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline :points="currentLang === 'ar' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'"/>
          </svg>
        </router-link>
      </div>

      <div class="products-grid-four">
        <template v-if="productsLoading">
          <ProductCardSkeleton v-for="n in Math.min(section.limit, 4)" :key="`sk-${section.id}-${n}`" />
        </template>
        <template v-else>
          <product-card
            v-for="product in sectionProducts(section)"
            :key="product.id"
            :product="product"
            @click="goToProduct(product)"
            @add-to-cart="addToCart(product)"
          />
        </template>
      </div>
    </section>

    <!-- 5. Special Offers (العروض المميزة): only when there are offers running; no offers, no section.
         It stays while loading (skeleton cards) so the slider is set up once. -->
    <section v-if="offersLoading || displayOffers.length" class="home-section offers-section container" data-testid="home-offers">
      <div class="section-header-flex">
        <div class="section-title-wrap">
          <h2 v-if="homeOffersTitle" class="section-title">{{ homeOffersTitle }}</h2>
          <span v-else-if="!homeSettingsReady" class="sk-shimmer sk-line section-title-skeleton" aria-hidden="true"></span>
        </div>
        <div v-if="!offersLoading && displayOffers.length > 4" class="section-nav-actions">
          <button class="nav-circle-btn" :class="{ 'is-hidden': !offersCanPrev, 'is-active': offersActiveDirection === 'prev' }" :disabled="!offersCanPrev" @click="scrollOffersSlider('prev')" :aria-label="currentLang === 'ar' ? 'السابق' : 'Previous'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline :points="currentLang === 'ar' ? '9 18 15 12 9 6' : '15 18 9 12 15 6'"/>
            </svg>
          </button>
          <button class="nav-circle-btn" :class="{ 'is-hidden': !offersCanNext, 'is-active': offersActiveDirection === 'next' }" :disabled="!offersCanNext" @click="scrollOffersSlider('next')" :aria-label="currentLang === 'ar' ? 'التالي' : 'Next'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline :points="currentLang === 'ar' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="offers-cards-slider" ref="offersSliderRef">
        <template v-if="offersLoading">
          <PortraitCardSkeleton v-for="n in 4" :key="`sk-offer-${n}`" variant="offer" />
        </template>
        <template v-else>
        <PortraitCard
          v-for="offer in displayOffers"
          :key="offer.id"
          :to="offer.link"
          :image="offer.image"
          :title="offer.title"
          :count="offer.subtitle"
          variant="offer"
        />
        </template>
      </div>
    </section>

    <!-- 6. The remaining product lists, below the offers -->
    <section
      v-for="section in (homeSettingsReady ? trailingSections : [])"
      :key="section.id"
      v-show="productsLoading || sectionProducts(section).length"
      class="home-section product-list-section container"
      :data-testid="`home-section-${section.id}`"
    >
      <div class="section-header-flex">
        <div class="section-title-wrap">
          <h2 v-if="sectionTitle(section)" class="section-title">{{ sectionTitle(section) }}</h2>
        </div>
        <router-link v-if="!productsLoading && sectionHasMore(section)" :to="sectionViewAllLink(section)" class="view-all-link">
          <span>{{ t('home.view_all') }}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline :points="currentLang === 'ar' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'"/>
          </svg>
        </router-link>
      </div>

      <div class="products-grid-four">
        <template v-if="productsLoading">
          <ProductCardSkeleton v-for="n in Math.min(section.limit, 4)" :key="`sk-${section.id}-${n}`" />
        </template>
        <template v-else>
          <product-card
            v-for="product in sectionProducts(section)"
            :key="product.id"
            :product="product"
            @click="goToProduct(product)"
            @add-to-cart="addToCart(product)"
          />
        </template>
      </div>
    </section>

    <!-- 7. Why Jabel (لماذا Jabel؟) -->
    <section class="why-jabel-section">
      <div class="container">
        <div class="why-header-center">
          <h2 class="section-title">{{ t('home.why_jabel') }}</h2>
          <p class="section-subtitle">{{ t('home.why_jabel_subtitle') }}</p>
        </div>

        <div class="why-cards-row">
          <div class="why-card-item" v-for="(item, idx) in whyItems" :key="idx">
            <div class="why-icon-circle">
              <img :src="item.icon" width="24" height="24" alt="" aria-hidden="true" class="why-icon-img" />
            </div>
            <h3 class="why-card-title">{{ item.title }}</h3>
            <p class="why-card-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { addProductToCart } from '../../../store/optionPicker';
import { useLocalized } from '../../../composables/useLocalized';
import { useOffers } from '../../product/composables/useOffers';
import { discountBadge } from '../../../domain/offers/siteDiscount';
import { useSEO } from '../../../composables/useSEO';
import { useSliderEdges } from '../../../composables/useSliderEdges';
import whyIconOriginal from '../../../assets/why-jabel/original-products.svg';
import whyIconDelivery from '../../../assets/why-jabel/fast-delivery.svg';
import whyIconConsultation from '../../../assets/why-jabel/pharmacist-consultation.svg';
import whyIconPrices from '../../../assets/why-jabel/competitive-prices.svg';
import whyIconPrivacy from '../../../assets/why-jabel/full-privacy.svg';
import { resolveLink } from '../../../utils/externalLink';
import ProductCard from '../../product/components/ProductCard.vue';
import ProductCardSkeleton from '../../../components/skeleton/ProductCardSkeleton.vue';
import PortraitCardSkeleton from '../../../components/skeleton/PortraitCardSkeleton.vue';
import CategoryCarousel from '../../category/components/CategoryCarousel.vue';
import PortraitCard from '../../../components/PortraitCard.vue';
import { productService } from '../../product/services/productService';
import { settingsService } from '../../../services/settingsService';
import { settingsToObject } from '../../../utils/siteSettings';
import { useCategories } from '../../category/composables/useCategories';
import { HOME_REFRESH_INTERVAL_MS } from '../../../config/cache';
import { HOME_SECTIONS_KEY, homeSectionsToRender, sectionViewAllLink } from '../../../domain/home/homeSections';

const router = useRouter();
const { t, locale } = useI18n();
const { localized } = useLocalized();
const { fetchOffers: fetchSharedOffers } = useOffers();
const { displayCategories, categoriesLoading, fetchCategories } = useCategories();
const currentLang = computed(() => locale.value);
// The section titles and the product lists come from the dashboard settings: until they are
// known (fresh cache or API) the page shows skeletons, never the built-in defaults.
const cachedHomeSettings = settingsService.peekSettings();
const homepageSettings = ref(cachedHomeSettings ? settingsToObject(cachedHomeSettings) : {});
const homeSettingsReady = ref(Boolean(cachedHomeSettings));

// «تسوق حسب الفئة» shows every category; picked categories get their own product lists below.
const homeCategories = computed(() => displayCategories.value);

// Product lists configured in the dashboard; with nothing saved, «منتجات مميزة» and «وصل حديثاً».
const homeSections = computed(() => homeSectionsToRender(homepageSettings.value[HOME_SECTIONS_KEY]));
const leadSections = computed(() => homeSections.value.slice(0, 1));
const trailingSections = computed(() => homeSections.value.slice(1));
const sectionProductsById = ref({});
const sectionProducts = (section) => (sectionProductsById.value[section.id] || []).slice(0, section.limit);
// «عرض الكل» only when the list has more than 4 products (counted before the display limit is applied).
const sectionHasMore = (section) => (sectionProductsById.value[section.id] || []).length > 4;
// The list's own title as written in the dashboard (Settings > Homepage); no title, no heading.
const sectionTitle = (section) => {
  const own = currentLang.value === 'ar' ? section.title_ar || section.title_en : section.title_en || section.title_ar;
  return own || '';
};

const homeCategoryTitle = computed(() => (!homeSettingsReady.value ? null : currentLang.value === 'ar'
  ? homepageSettings.value.home_section_category_title_ar || ''
  : homepageSettings.value.home_section_category_title_en || ''));

const homeOffersTitle = computed(() => (!homeSettingsReady.value ? '' : currentLang.value === 'ar'
  ? homepageSettings.value.home_section_offers_title_ar || ''
  : homepageSettings.value.home_section_offers_title_en || ''));

useSEO({
  title: 'جبل (Jabel) - أجهزة مطبخ بمعايير إيطالية فاخرة',
  description: 'تسوق أفضل مواقد الغاز الإيطالية، أفران البلت إن، وشفاطات المطابخ الفاخرة بأعلى معايير الأمان والجودة وضمان شامل معتمد.',
  keywords: 'جبل, أجهزة مطبخ, مواقد غاز, أفران بلت إن, شفاطات إيطالية, ميكروويف بلت إن, Jabel, أجهزة إيطالية'
});

const offersSliderRef = ref(null);
const { canPrev: offersCanPrev, canNext: offersCanNext } = useSliderEdges(offersSliderRef);
const offersActiveDirection = ref('next');

const rawOffers = ref([]);
const rawSliders = ref([]);
const slidersLoading = ref(true);
// Each API-driven section shows a shimmer until its own request settles.
const offersLoading = ref(true);
const productsLoading = ref(true);
const currentHeroIndex = ref(0);
const heroAutoplayTimer = ref(null);
const heroTransitionName = ref('slide-right');

const backendOrigin = (import.meta.env.VITE_API_BASE_URL || 'https://backend-jabal.be-kite.com/api')
  .replace(/\/api\/?$/, '');

const normalizeStorageImage = (value, fallback = '') => {
  if (!value) return fallback;
  const raw = String(value);
  if (raw.startsWith('/storage/')) return `${backendOrigin}/public${raw}`;
  if (raw.includes('/storage/') && !raw.includes('/public/storage/')) {
    return raw.replace('/storage/', '/public/storage/');
  }
  return raw;
};

// Warm the browser cache before the carousel needs the next background image.
// This preserves the existing carousel logic while removing first-view delays.
const preloadedHeroImages = new Set();
const preloadHeroImages = (slides = []) => {
  slides.forEach((slide, index) => {
    const imageUrl = normalizeStorageImage(slide.image);
    if (!imageUrl || preloadedHeroImages.has(imageUrl)) return;
    preloadedHeroImages.add(imageUrl);
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = index === 0 ? 'high' : 'low';
    image.src = imageUrl;
  });
};

const displayHeroSlides = computed(() => {
  if (rawSliders.value && rawSliders.value.length > 0) {
    const isAr = currentLang.value === 'ar';
    // The English site never shows Arabic text: an English field that still holds Arabic (a copied value) stays empty.
    const forLang = (text) => (!isAr && /[\u0600-\u06FF]/.test(text || '') ? '' : (text || ''));
    return rawSliders.value.map((s, idx) => {
      const title = isAr
        ? (s.title_i18n?.ar || localized(s, 'title') || s.title || '')
        : (s.title_i18n?.en || s.title_en || localized(s, 'title') || s.title || '');
      const desc = isAr
        ? (s.description_i18n?.ar || localized(s, 'description') || s.description || '')
        : (s.description_i18n?.en || s.description_en || localized(s, 'description') || s.description || '');
      const btnText = isAr
        ? (s.button_text_i18n?.ar || s.button_text || 'استكشف التشكيلة')
        : (s.button_text_i18n?.en || s.button_text_en || 'Explore Collection');

      return {
        id: s.id || idx,
        tag: isAr ? 'معايير إيطالية فاخرة' : 'Luxury Italian Standards',
        title: forLang(title),
        title_sub: '',
        description: forLang(desc),
        image: normalizeStorageImage(s.image),
        link: s.link || '/products',
        button_text: btnText
      };
    });
  }
  // No built-in slide: the hero is rendered only from /v1/site/sliders.
  return [];
});

// Visual direction: in RTL the dots run right-to-left, so "next" moves left.
const nextHeroSlide = () => {
  heroTransitionName.value = currentLang.value === 'ar' ? 'slide-left' : 'slide-right';
  if (currentHeroIndex.value >= displayHeroSlides.value.length - 1) {
    currentHeroIndex.value = 0;
  } else {
    currentHeroIndex.value++;
  }
};

const prevHeroSlide = () => {
  heroTransitionName.value = currentLang.value === 'ar' ? 'slide-right' : 'slide-left';
  if (currentHeroIndex.value <= 0) {
    currentHeroIndex.value = displayHeroSlides.value.length - 1;
  } else {
    currentHeroIndex.value--;
  }
};

const goToHeroSlide = (idx) => {
  const forward = idx > currentHeroIndex.value;
  heroTransitionName.value = (forward === (currentLang.value !== 'ar')) ? 'slide-right' : 'slide-left';
  currentHeroIndex.value = idx;
};

const startHeroAutoplay = () => {
  stopHeroAutoplay();
  if (displayHeroSlides.value.length > 1) {
    heroAutoplayTimer.value = setInterval(() => {
      nextHeroSlide();
    }, 4500);
  }
};

const stopHeroAutoplay = () => {
  if (heroAutoplayTimer.value) {
    clearInterval(heroAutoplayTimer.value);
    heroAutoplayTimer.value = null;
  }
};

// 1. Trust features below hero (text and icons from the trust-badges design, in reading order: the first item
// sits on the right in Arabic)
const trustFeatures = computed(() => {
  if (currentLang.value === 'en') {
    return [
      // { id: 'quality', title: 'Quality Guaranteed' }, // hidden (commented out)
      { id: 'authentic', title: 'Genuine Products' },
      { id: 'payment', title: 'Secure Payment' },
      { id: 'delivery', title: 'Fast Delivery' },
      { id: 'consult', title: 'Pharmacist Consultation' }
    ];
  }
  return [
    // { id: 'quality', title: 'ضمان الجودة' }, // hidden (commented out)
    { id: 'authentic', title: 'منتجات أصلية' },
    { id: 'payment', title: 'دفع آمن' },
    { id: 'delivery', title: 'توصيل سريع' },
    { id: 'consult', title: 'استشارة صيدلانية' }
  ];
});
const displayOffers = computed(() => {
  if (!rawOffers.value.length) return [];
  const isAr = currentLang.value === 'ar';
  return rawOffers.value.map((offer) => {
    const title = isAr
      ? (offer.name_i18n?.ar || localized(offer, 'name') || offer.name)
      : (offer.name_i18n?.en || localized(offer, 'name') || offer.name);
    const badgeText = discountBadge(offer, currentLang.value);
    const description = isAr ? offer.description_i18n?.ar : offer.description_i18n?.en;
    return {
      id: offer.id,
      title,
      badgeText,
      subtitle: String(description || '').trim() || badgeText,
      image: normalizeStorageImage(offer.image, '/images/home/offer_clearance_pro.jpg'),
      link: `/offers?offer=${offer.id}`
    };
  });
});

// 4. Why Jabel items matching the mockup exactly
// "Why us" cards, in reading order (the first card sits on the right in Arabic).
const whyItems = computed(() => {
  const en = currentLang.value === 'en';
  return [
    {
      icon: whyIconPrivacy,
      title: en ? 'Full Privacy' : 'خصوصية تامة',
      description: en
        ? 'Discreet, professional packaging that keeps your privacy, with full protection of your data.'
        : 'تغليف سري واحترافي يحفظ خصوصيتك مع حماية كاملة لبياناتك.',
    },
    {
      icon: whyIconPrices,
      title: en ? 'Competitive Prices' : 'أسعار تنافسية',
      description: en
        ? 'Competitive prices and ongoing offers on all health and care products.'
        : 'أسعار منافسة وعروض مستمرة على جميع المنتجات الصحية والعناية.',
    },
    {
      icon: whyIconConsultation,
      title: en ? 'Pharmacist Consultation' : 'استشارة صيدلانية',
      description: en
        ? 'A specialised pharmacist team offering advice and support around the clock.'
        : 'فريق صيدلاني متخصص يقدم لك الاستشارة والدعم على مدار الساعة.',
    },
    {
      icon: whyIconDelivery,
      title: en ? 'Fast Delivery' : 'توصيل سريع',
      description: en
        ? 'Fast delivery to your door within hours, in safe packaging that protects the product.'
        : 'توصيل سريع لباب منزلك خلال ساعات مع تغليف آمن يحفظ جودة المنتج.',
    },
    {
      icon: whyIconOriginal,
      title: en ? 'Original Products' : 'منتجات أصلية',
      description: en
        ? 'All our products are original and licensed by the Food and Drug Authority.'
        : 'جميع منتجاتنا أصلية ومرخصة من الهيئة العامة للغذاء والدواء.',
    },
  ];
});

const scrollOffersSlider = (direction) => {
  if (!offersSliderRef.value) return;
  offersActiveDirection.value = direction;
  const isRtl = currentLang.value === 'ar';
  const scrollAmount = offersSliderRef.value.clientWidth * 0.75;
  let sign = 1;
  if (isRtl) {
    sign = direction === 'next' ? -1 : 1;
  } else {
    sign = direction === 'next' ? 1 : -1;
  }
  offersSliderRef.value.scrollBy({
    left: sign * scrollAmount,
    behavior: 'smooth'
  });
};

const goToProduct = (product) => {
  if (product && product.id) {
    router.push(`/product/${product.id}`);
  }
};

const addToCart = (product) => {
  if (product) {
    addProductToCart(product);
  }
};

// The home page is the only page that caches API data: it renders from the
// last response instantly, then asks the API again every refresh interval.
// Loaders take { cache: true } on first load and { cache: true, refresh: true }
// on a periodic refresh, which updates the page silently (no skeletons) and
// keeps what is on screen if the request fails.
const HOME_LOAD = { cache: true };
const HOME_REFRESH = { cache: true, refresh: true };

// Re-rendering cards and the hero every few seconds is wasted work when
// nothing changed, so only replace data that actually differs.
const replaceIfChanged = (target, next) => {
  if (JSON.stringify(target.value) === JSON.stringify(next)) return false;
  target.value = next;
  return true;
};

const fetchSliders = async (options = HOME_LOAD) => {
  if (!options.refresh) slidersLoading.value = true;
  try {
    const list = await settingsService.getSliders({ is_active: 1 }, options);
    const activeSlides = Array.isArray(list)
      ? list.filter(s => s.status === 'active' || s.is_active !== 0)
        // The dashboard's order (1, 2, 3...) decides the slide order; ties fall back to the id.
        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || (Number(a.id) || 0) - (Number(b.id) || 0))
      : [];
    if (replaceIfChanged(rawSliders, activeSlides)) {
      preloadHeroImages(activeSlides);
      if (currentHeroIndex.value >= activeSlides.length) currentHeroIndex.value = 0;
      startHeroAutoplay();
    }
  } catch (err) {
    console.error('Failed to fetch sliders from API:', err);
    if (!options.refresh) rawSliders.value = [];
  } finally {
    slidersLoading.value = false;
  }
};

const fetchOffers = async (options = HOME_LOAD) => {
  if (!options.refresh) offersLoading.value = true;
  try {
    const result = await productService.getDiscounts({}, options);
    replaceIfChanged(rawOffers, Array.isArray(result) ? result : []);
  } catch (err) {
    console.error('Failed to fetch offers from API:', err);
    if (!options.refresh) rawOffers.value = [];
  } finally {
    offersLoading.value = false;
  }
};

// Loads the products of every list on the page. Featured and newest come from
// their own endpoints; a category list filters the (cached) catalog by category.
const fetchSectionProducts = async (section, options) => {
  if (section.source === 'featured') return productService.getFeaturedProducts(options);
  if (section.source === 'new_arrivals') return productService.getNewArrivals(options);
  const result = await productService.getProducts({ category_id: section.category_id, is_active: 1, sort_by: 'newest' }, options);
  return result.data || result.items || [];
};

const fetchProducts = async (options = HOME_LOAD) => {
  if (!options.refresh) productsLoading.value = true;
  try {
    const sections = homeSections.value;
    const results = await Promise.allSettled(sections.map((section) => fetchSectionProducts(section, options)));
    const next = {};
    results.forEach((result, index) => {
      const id = sections[index].id;
      if (result.status === 'fulfilled') next[id] = Array.isArray(result.value) ? result.value : [];
      else {
        console.error(`Failed to fetch products for home list ${id}:`, result.reason);
        next[id] = options.refresh ? (sectionProductsById.value[id] || []) : [];
      }
    });
    replaceIfChanged(sectionProductsById, next);
  } finally {
    productsLoading.value = false;
  }
};

const fetchHomepageSettings = async (options = HOME_LOAD) => {
  try {
    replaceIfChanged(homepageSettings, settingsToObject(await settingsService.getSettings(options)));
  } catch (error) {
    if (!options.refresh) homepageSettings.value = {};
    console.warn('Homepage settings unavailable:', error?.message);
  } finally {
    homeSettingsReady.value = true;
  }
};

const loadHomeData = (options = HOME_LOAD) => Promise.allSettled([
  fetchHomepageSettings(options).then(() => fetchProducts(options)),
  fetchSliders(options),
  fetchCategories(options),
  fetchOffers(options),
  fetchSharedOffers(options),
]);

// Periodic refresh: runs only while the tab is visible, never overlaps itself,
// and catches up as soon as the visitor returns to the tab.
let homeRefreshTimer = null;
let homeRefreshRunning = false;

const refreshHomeData = async () => {
  if (homeRefreshRunning || document.visibilityState === 'hidden') return;
  homeRefreshRunning = true;
  try {
    await loadHomeData(HOME_REFRESH);
  } finally {
    homeRefreshRunning = false;
  }
};

const handleHomeVisibility = () => {
  if (document.visibilityState === 'visible') refreshHomeData();
};

onMounted(() => {
  loadHomeData();
  startHeroAutoplay();
  homeRefreshTimer = setInterval(refreshHomeData, HOME_REFRESH_INTERVAL_MS);
  document.addEventListener('visibilitychange', handleHomeVisibility);
});

onUnmounted(() => {
  stopHeroAutoplay();
  clearInterval(homeRefreshTimer);
  homeRefreshTimer = null;
  document.removeEventListener('visibilitychange', handleHomeVisibility);
});
</script>

<style scoped>
.home-view {
  width: 100%;
  background: #ffffff;
  color: #111827;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 64px !important;
  padding-right: 64px !important;
  box-sizing: border-box;
}

/* 1. Hero Section */
.hero-banner-wrapper {
  width: 100%;
  background: #0d0e11;
  display: flex;
  justify-content: center;
}

.hero-section {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 600px;
  min-height: 600px;
  margin: 0 auto;
  border-radius: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0d0e11;
  box-sizing: border-box;
}

.hero-slides-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-slide-item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}

/* ============================================================
   Hero slide transition: "cinematic reveal"
   - the new slide is revealed by a clip-path wipe from the side the arrow points to
   - its photo zooms out from 1.45x while de-blurring (a camera pull-back)
   - the old slide slides away in parallax, darkens and blurs
   - a light streak sweeps across the screen on the wipe edge
   - title, text and button rise in one after another (staggered, with blur)
   Direction-independent: slide-right brings the new slide in from the right edge, slide-left from the left.
   ============================================================ */
.slide-right-enter-active,
.slide-left-enter-active {
  z-index: 3;
  transition: clip-path 1.15s cubic-bezier(0.77, 0, 0.18, 1);
}
.slide-right-leave-active,
.slide-left-leave-active {
  z-index: 2;
  transition: transform 1.15s cubic-bezier(0.77, 0, 0.18, 1), filter 1.15s cubic-bezier(0.77, 0, 0.18, 1);
}
.slide-right-enter-from { clip-path: inset(0 0 0 100%); }
.slide-left-enter-from { clip-path: inset(0 100% 0 0); }
.slide-right-enter-to,
.slide-left-enter-to { clip-path: inset(0 0 0 0); }
.slide-right-leave-to { transform: translateX(-24%) scale(0.9); filter: brightness(0.25) blur(6px); }
.slide-left-leave-to { transform: translateX(24%) scale(0.9); filter: brightness(0.25) blur(6px); }

/* Photo: camera pull-back */
.slide-right-enter-active .hero-bg,
.slide-left-enter-active .hero-bg {
  transition: transform 1.9s cubic-bezier(0.16, 1, 0.3, 1), filter 1.3s ease-out;
}
.slide-right-enter-from .hero-bg,
.slide-left-enter-from .hero-bg {
  transform: scale(1.45);
  filter: brightness(1.5) blur(14px);
}

/* Text: staggered rise */
.slide-right-enter-active .hero-title,
.slide-left-enter-active .hero-title,
.slide-right-enter-active .hero-desc,
.slide-left-enter-active .hero-desc,
.slide-right-enter-active .hero-actions,
.slide-left-enter-active .hero-actions {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease-out;
}
.slide-right-enter-active .hero-title, .slide-left-enter-active .hero-title { transition-delay: 0.5s; }
.slide-right-enter-active .hero-desc, .slide-left-enter-active .hero-desc { transition-delay: 0.68s; }
.slide-right-enter-active .hero-actions, .slide-left-enter-active .hero-actions { transition-delay: 0.86s; }
.slide-right-enter-from .hero-title,
.slide-left-enter-from .hero-title,
.slide-right-enter-from .hero-desc,
.slide-left-enter-from .hero-desc,
.slide-right-enter-from .hero-actions,
.slide-left-enter-from .hero-actions {
  opacity: 0;
  transform: translateY(70px) scale(0.96);
  filter: blur(10px);
}
.slide-right-enter-from .hero-actions,
.slide-left-enter-from .hero-actions { transform: translateY(40px) scale(0.8); }

/* Light streak riding the wipe edge */
.slide-right-enter-active::after,
.slide-left-enter-active::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 38%, rgba(255, 255, 255, 0.45) 50%, transparent 62%);
  mix-blend-mode: overlay;
}
.slide-right-enter-active::after { animation: hero-streak-from-right 1.15s cubic-bezier(0.77, 0, 0.18, 1) both; }
.slide-left-enter-active::after { animation: hero-streak-from-left 1.15s cubic-bezier(0.77, 0, 0.18, 1) both; }
@keyframes hero-streak-from-right { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
@keyframes hero-streak-from-left { from { transform: translateX(-100%); } to { transform: translateX(100%); } }

@media (prefers-reduced-motion: reduce) {
  .slide-right-enter-active, .slide-left-enter-active { transition: opacity 0.3s linear; }
  .slide-right-leave-active, .slide-left-leave-active { transition: opacity 0.3s linear; }
  .slide-right-enter-from, .slide-left-enter-from { clip-path: none; opacity: 0; }
  .slide-right-leave-to, .slide-left-leave-to { transform: none; filter: none; opacity: 0; }
  .slide-right-enter-active::after, .slide-left-enter-active::after { display: none; }
}

/* Navigation arrows */
.hero-nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(13, 14, 17, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.hero-nav-arrow:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #111827;
  border-color: #ffffff;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
}

.hero-arrow-right {
  right: 28px;
}

.hero-arrow-left {
  left: 28px;
}

/* Carousel Indicators (Dots) */
.hero-indicators {
  display: flex; /* shown on desktop; hidden on phones (see the max-width: 768px block) */
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(13, 14, 17, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.hero-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.hero-dot.active {
  width: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  filter: brightness(0.92);
  transition: transform 6s ease-out;
}


/* Hero shimmer (loading state) */
.hero-skeleton { position: relative; z-index: 1; }
.hero-skeleton .hero-content { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 560px; }
.sk {
  display: block;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.06) 25%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0.06) 75%);
  background-size: 200% 100%;
  animation: hero-shimmer 1.4s linear infinite;
}
.sk-title { width: 100%; height: 52px; }
.sk-title-short { width: 62%; }
.sk-desc { width: 85%; height: 16px; }
.sk-desc-short { width: 55%; }
.sk-btn { width: 190px; height: 52px; margin-top: 8px; border-radius: 10px; }
@keyframes hero-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .sk { animation: none; }
}
.hero-slide-item:hover .hero-bg {
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 50%, rgba(13, 14, 17, 0.45) 0%, rgba(13, 14, 17, 0.85) 100%);
}

.home-view[dir="rtl"] .hero-overlay {
  background: linear-gradient(270deg, rgba(13, 14, 17, 0.88) 0%, rgba(13, 14, 17, 0.6) 45%, rgba(13, 14, 17, 0.25) 100%);
}

.home-view[dir="ltr"] .hero-overlay {
  background: linear-gradient(90deg, rgba(13, 14, 17, 0.88) 0%, rgba(13, 14, 17, 0.6) 45%, rgba(13, 14, 17, 0.25) 100%);
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 120px; /* start after the left arrow */
  padding-right: 64px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

/* The fixed header (40px bar + 80px navbar) covers the top 120px of the banner: centre the text and the
   arrows in the part that shows, so the space above them equals the space below. */
@media (min-width: 1025px) {
  .hero-container { padding-top: 120px; }
  .hero-nav-arrow { top: calc(50% + 60px); }
}

.home-view[dir="rtl"] .hero-container {
  padding-right: 120px; /* start after the right arrow */
  justify-content: flex-start; /* Starts on right in RTL */
}

.hero-content {
  max-width: 580px;
  padding: 0;
  color: #ffffff;
}

.hero-title {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.25;
  color: #ffffff;
  margin-bottom: 18px;
  letter-spacing: -0.5px;
}

.hero-title-sub {
  font-weight: 700;
  color: #ffffff;
}

.hero-desc {
  font-size: 15.5px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 28px;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero-btn-white {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #111827;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 32px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.hero-btn-white:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

/* 2. Trust Bar */
.trust-bar-section {
  background: #f8fafc;
  border-bottom: 1px solid #eef2f6;
  padding: 12px 0;
  margin-top: 0;
}

.trust-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 52px;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #262626;
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.trust-icon-box {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-primary, #267B00);
  flex-shrink: 0;
}

.trust-icon-box svg {
  width: 100%;
  height: 100%;
  display: block;
}

.trust-title {
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #262626;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .trust-bar-container {
    gap: 28px;
  }
}

@media (max-width: 640px) {
  .trust-bar-container {
    gap: 14px 20px;
    justify-content: center;
  }
  .trust-item {
    font-size: 12.5px;
  }
}

/* Common Section Headers */
.home-section {
  padding-top: 36px;
  padding-bottom: 28px;
}

.home-section.categories-section {
  padding-top: 22px;
}

.section-header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
  letter-spacing: -0.3px;
}

.section-title-skeleton {
  width: 220px;
  height: 32px;
  border-radius: 8px;
}

.section-title-wrap > .section-title:last-child {
  margin-bottom: 0;
}

.section-subtitle {
  font-size: 13.5px;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
  transition: opacity 0.2s;
}

.view-all-link:hover {
  opacity: 0.75;
}

.section-nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-circle-btn {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: #ffffff;
  color: #000000;
  /* No outline: a soft grey shadow lifts the button instead. */
  border: none;
  box-shadow: 0 2px 8px rgba(100, 116, 139, 0.28);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-circle-btn.is-active {
  background: var(--color-brand-primary, #000000);
  color: var(--color-brand-contrast, #ffffff);
}

.nav-circle-btn:hover {
  transform: scale(1.06);
}

/* Both arrows always show; the one that cannot go any further is dimmed. */
.nav-circle-btn.is-hidden {
  opacity: 0.4;
  box-shadow: 0 1px 4px rgba(100, 116, 139, 0.18);
  cursor: default;
  pointer-events: none;
}

/* 3. Category Portrait Cards */
.category-cards-slider {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
}

.category-cards-slider::-webkit-scrollbar,
.offers-cards-slider::-webkit-scrollbar {
  display: none;
}


/* 3.1 Special Offers Slider & Cards (العروض المميزة) */
.offers-cards-slider {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  /* room above/below for the card shadow (0 4px 16px) so the scroller does not clip it */
  padding: 4px 0 24px;
}

/* 4. Products Grid 4 Columns */
.products-grid-four {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* 7. Why Jabel Section */
/* "Why us" section — sizes taken from the Figma frame (1440 x 397). */
.why-jabel-section {
  background-color: #f8fafc;
  padding: 40px 0;
}

.why-header-center {
  text-align: center;
  margin-bottom: 40px;
}

.why-header-center .section-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  color: #000000;
  margin: 0 0 8px;
  letter-spacing: 0;
}

.why-header-center .section-subtitle {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #64748b;
  margin: 0 auto;
}

.why-cards-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.why-card-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 23px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.why-card-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 8px 20px -6px rgba(15, 23, 42, 0.08);
}

.why-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.why-icon-img {
  display: block;
  width: 24px;
  height: 24px;
}

.why-card-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #000000;
  margin: 0 0 16px;
}

.why-card-desc {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #64748b;
  margin: 0;
}

.home-view[dir="rtl"] .why-card-item {
  text-align: right;
}

.home-view[dir="ltr"] .why-card-item {
  text-align: left;
}

/* Responsive Media Queries */
@media (max-width: 1024px) {
  .container {
    padding-left: 32px !important;
    padding-right: 32px !important;
  }

  .hero-container {
    padding-left: 32px;
    padding-right: 32px;
  }

  .category-cards-slider,
  .offers-cards-slider {
    gap: 14px;
  }

  .products-grid-four {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .why-cards-row {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .hero-section {
    height: auto;
    min-height: 480px;
    padding: 0;
  }

  .hero-container,
  .home-view[dir="rtl"] .hero-container {
    padding: 24px 16px 76px;
  }

  .hero-content {
    width: 100%;
  }

  /* Phones: no dots (they stay in the markup, shown on desktop only). The arrows sit at the bottom corners,
     inside the 76px bottom padding of the hero, so they never overlap the title, text or button. */
  .hero-indicators {
    display: none;
  }

  .hero-nav-arrow {
    top: auto;
    bottom: 16px;
    transform: none;
    width: 40px;
    height: 40px;
  }

  .hero-nav-arrow:hover {
    transform: none;
  }

  .hero-arrow-right {
    right: 16px;
  }

  .hero-arrow-left {
    left: 16px;
  }

  .hero-title {
    font-size: 34px;
  }

  .hero-desc {
    font-size: 14px;
  }

  .trust-bar-container {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    scrollbar-width: none;
    padding-bottom: 6px;
  }

  .trust-bar-container::-webkit-scrollbar {
    display: none;
  }

  .trust-item {
    flex-shrink: 0;
  }

  .category-cards-slider {
    grid-template-columns: repeat(5, 190px);
    gap: 12px;
  }


  .offers-cards-slider {
    gap: 16px;
  }


  .products-grid-four {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .why-cards-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }

  .why-cards-row {
    grid-template-columns: 1fr;
  }

  .offers-cards-slider {
    gap: 12px;
  }

}

@media (max-width: 360px) {
}
</style>
