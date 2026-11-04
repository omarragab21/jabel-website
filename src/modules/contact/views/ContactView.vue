<template>
  <div class="contact-page" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
    <!-- 1. Hero Banner -->
    <section class="support-hero-banner">
      <div class="hero-bg" :style="{ backgroundImage: `url('${contactHeroImage}')` }"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-container">
        <div class="hero-content">
          <!-- Pre-title with horizontal line -->
          <div class="hero-subheading">
            <span class="subheading-text">{{ currentLang === 'ar' ? 'خدمة العملاء والدعم' : 'Customer Service & Support' }}</span>
            <span class="subheading-line"></span>
          </div>
          <!-- Main Title -->
          <h1 class="hero-title">{{ currentLang === 'ar' ? 'الدعم الفني' : 'Technical Support' }}</h1>
          <!-- Subtitle -->
          <p class="hero-desc">
            {{ currentLang === 'ar'
              ? 'نحن هنا لمساعدتك في اختيار المنتج المناسب لاحتياجاتك وضمان تشغيله بأعلى كفاءة'
              : 'We are here to help you choose the right product for your needs and ensure peak operating efficiency'
            }}
          </p>
        </div>
      </div>
    </section>

    <!-- 2. Main Content: Send Message Form (Right in RTL) + Contact Information (Left in RTL) -->
    <section class="support-main-section">
      <div class="container">
        <div class="support-layout-grid">

          <!-- Column 1 (Right in RTL): Send Us a Message Form Card -->
          <div class="contact-form-col">
            <div class="form-box-card">
              <!-- Form Header -->
              <div class="form-box-header">
                <svg class="headset-svg" width="24" height="24" viewBox="1320 638 24 24" fill="none" aria-hidden="true">
                  <path d="M1332 641.75C1328.69 641.75 1326.13 643.872 1325.79 646.417C1325.93 646.474 1326.08 646.54 1326.23 646.608L1326.31 646.646L1326.38 646.676C1326.65 646.8 1326.92 646.921 1327.13 647.106C1327.75 647.648 1327.75 648.363 1327.75 648.776L1327.75 653.224C1327.75 653.637 1327.75 654.352 1327.13 654.894C1326.92 655.079 1326.65 655.2 1326.38 655.324L1326.31 655.353L1326.23 655.392C1325.86 655.558 1325.52 655.714 1325.16 655.743C1324.12 655.828 1323.53 655.115 1323.19 654.696L1323.16 654.662C1323.07 654.556 1322.97 654.432 1322.85 654.297C1322.64 654.052 1322.4 653.773 1322.2 653.514C1321.87 653.085 1321.54 652.571 1321.38 651.974C1321.21 651.335 1321.21 650.665 1321.38 650.026C1321.5 649.593 1321.71 649.21 1322 648.809C1322.27 648.42 1322.64 647.972 1323.1 647.419L1323.11 647.396C1323.13 647.373 1323.15 647.349 1323.17 647.324C1323.4 647.04 1323.75 646.611 1324.28 646.391C1324.64 642.863 1328.06 640.25 1332 640.25C1335.94 640.25 1339.36 642.863 1339.72 646.391C1340.25 646.611 1340.6 647.04 1340.83 647.324L1340.83 647.325C1340.85 647.35 1340.87 647.374 1340.89 647.396L1340.91 647.419C1341.36 647.972 1341.73 648.42 1342 648.809C1342.29 649.21 1342.5 649.593 1342.62 650.026C1342.79 650.665 1342.79 651.335 1342.62 651.974C1342.46 652.571 1342.13 653.085 1341.8 653.514C1341.6 653.773 1341.36 654.052 1341.15 654.297C1341.03 654.432 1340.93 654.556 1340.84 654.662L1340.81 654.696C1340.58 654.973 1340.25 655.378 1339.75 655.596L1339.75 655.8C1339.75 658.129 1337.46 659.75 1335 659.75L1333 659.75C1332.59 659.75 1332.25 659.414 1332.25 659C1332.25 658.585 1332.59 658.25 1333 658.25L1335 658.25C1336.96 658.25 1338.25 657.005 1338.25 655.8L1338.25 655.598C1338.09 655.538 1337.94 655.466 1337.78 655.392L1337.69 655.353L1337.63 655.324C1337.35 655.2 1337.09 655.079 1336.87 654.894C1336.25 654.352 1336.25 653.637 1336.25 653.224L1336.25 648.776C1336.25 648.363 1336.25 647.648 1336.87 647.106C1337.09 646.921 1337.35 646.8 1337.63 646.676L1337.69 646.646L1337.78 646.608C1337.92 646.54 1338.07 646.474 1338.21 646.417C1337.87 643.872 1335.32 641.75 1332 641.75ZM1339.02 654.25C1339.01 654.25 1339.01 654.25 1339 654.25C1339 654.25 1338.99 654.25 1338.99 654.25C1338.98 654.249 1338.97 654.249 1338.96 654.248C1338.9 654.243 1338.82 654.218 1338.31 653.988C1337.93 653.814 1337.88 653.784 1337.86 653.762C1337.81 653.723 1337.79 653.691 1337.78 653.63C1337.76 653.541 1337.75 653.422 1337.75 653.195L1337.75 648.804C1337.75 648.577 1337.76 648.459 1337.78 648.369C1337.79 648.309 1337.81 648.277 1337.86 648.238C1337.88 648.215 1337.93 648.186 1338.31 648.011C1338.82 647.782 1338.9 647.756 1338.96 647.752C1338.97 647.75 1338.99 647.75 1339 647.75L1339.01 647.75C1339.1 647.75 1339.17 647.78 1339.26 647.843C1339.39 647.943 1339.52 648.093 1339.73 648.35C1340.21 648.931 1340.54 649.336 1340.78 649.673C1341.01 650.002 1341.12 650.222 1341.17 650.421C1341.28 650.801 1341.28 651.198 1341.17 651.579C1341.08 651.903 1340.89 652.236 1340.61 652.603C1340.43 652.838 1340.25 653.039 1340.07 653.252C1339.95 653.394 1339.82 653.542 1339.68 653.709C1339.49 653.945 1339.36 654.082 1339.24 654.168C1339.17 654.22 1339.11 654.247 1339.02 654.25ZM1325 647.75L1324.99 647.75C1324.9 647.75 1324.83 647.78 1324.74 647.843C1324.61 647.943 1324.48 648.093 1324.27 648.35C1323.79 648.931 1323.46 649.336 1323.22 649.673C1322.99 650.002 1322.88 650.222 1322.83 650.421C1322.72 650.801 1322.72 651.198 1322.83 651.579C1322.92 651.903 1323.11 652.236 1323.39 652.603C1323.57 652.838 1323.75 653.039 1323.93 653.252C1324.05 653.394 1324.18 653.542 1324.32 653.709C1324.51 653.945 1324.64 654.082 1324.76 654.168C1324.85 654.231 1324.92 654.258 1325.04 654.248C1325.1 654.243 1325.19 654.218 1325.69 653.988C1326.07 653.814 1326.12 653.784 1326.14 653.762C1326.19 653.723 1326.21 653.691 1326.22 653.63C1326.24 653.541 1326.25 653.422 1326.25 653.195L1326.25 648.804C1326.25 648.577 1326.24 648.459 1326.22 648.369C1326.21 648.309 1326.19 648.277 1326.14 648.238C1326.12 648.215 1326.07 648.186 1325.69 648.011C1325.19 647.782 1325.1 647.756 1325.04 647.752C1325.03 647.75 1325.01 647.75 1325 647.75Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
                </svg>
                <h3 class="form-box-title">{{ currentLang === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message' }}</h3>
              </div>

              <!-- Alert Notifications -->
              <div v-if="successMsg" class="custom-alert success-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ successMsg }}</span>
              </div>

              <div v-if="errorMsg" class="custom-alert error-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{{ errorMsg }}</span>
              </div>

              <!-- Main Form -->
              <form @submit.prevent="handleSubmit" class="main-contact-form" novalidate>
                <!-- 1. الاسم -->
                <div class="form-group-item">
                  <label class="item-label" for="contact-name">{{ currentLang === 'ar' ? 'الاسم' : 'Name' }}</label>
                  <input
                    id="contact-name"
                    type="text"
                    v-model="form.name"
                    :placeholder="currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name'"
                    class="item-input"
                    :class="{ 'has-error': errors.name }"
                    autocomplete="name"
                    required
                  />
                  <span v-if="errors.name" class="inline-err-text">{{ errors.name }}</span>
                </div>

                <!-- 2. البريد الإلكتروني -->
                <div class="form-group-item">
                  <label class="item-label" for="contact-email">{{ currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address' }}</label>
                  <input
                    id="contact-email"
                    type="email"
                    v-model="form.email"
                    placeholder="example@domain.com"
                    class="item-input input-ltr"
                    :class="{ 'has-error': errors.email }"
                    autocomplete="email"
                    required
                  />
                  <span v-if="errors.email" class="inline-err-text">{{ errors.email }}</span>
                </div>

                <!-- 3. رقم الهاتف -->
                <div class="form-group-item">
                  <label class="item-label" for="contact-phone">{{ currentLang === 'ar' ? 'رقم الهاتف' : 'Phone Number' }}</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    v-model="form.phone"
                    placeholder="050XXXXXXX"
                    class="item-input input-ltr"
                    :class="{ 'has-error': errors.phone }"
                    autocomplete="tel"
                    required
                  />
                  <span v-if="errors.phone" class="inline-err-text">{{ errors.phone }}</span>
                </div>

                <!-- 4. نوع الدعم -->
                <div class="form-group-item">
                  <label class="item-label" for="contact-subject">{{ currentLang === 'ar' ? 'نوع الدعم' : 'Support Type' }}</label>
                  <div class="select-container">
                    <select id="contact-subject" v-model="form.subject" class="item-select" required>
                      <option value="استفسار عن منتج">{{ currentLang === 'ar' ? 'استفسار عن منتج' : 'Product Inquiry' }}</option>
                      <option value="طلب صيانة وتركيب">{{ currentLang === 'ar' ? 'طلب صيانة وتركيب' : 'Maintenance & Installation' }}</option>
                      <option value="استفسار عن طلب أو شحنة">{{ currentLang === 'ar' ? 'استفسار عن طلب أو شحنة' : 'Order or Shipment Inquiry' }}</option>
                      <option value="شكوى أو اقتراح">{{ currentLang === 'ar' ? 'شكوى أو اقتراح' : 'Complaint or Suggestion' }}</option>
                      <option value="أخرى">{{ currentLang === 'ar' ? 'أخرى' : 'Other' }}</option>
                    </select>
                    <svg class="select-arrow-svg" width="24" height="24" viewBox="608 1010 24 24" fill="none" aria-hidden="true">
                      <path d="M615.503 1019.13C615.605 1019.26 615.908 1019.67 616.089 1019.9C616.45 1020.36 616.945 1020.98 617.478 1021.59C618.014 1022.21 618.576 1022.81 619.077 1023.25C619.327 1023.47 619.548 1023.64 619.729 1023.75C619.9 1023.85 620.001 1023.87 620.001 1023.87C620.001 1023.87 620.099 1023.85 620.27 1023.75C620.452 1023.64 620.672 1023.47 620.923 1023.25C621.423 1022.81 621.986 1022.21 622.522 1021.59C623.055 1020.98 623.549 1020.36 623.911 1019.9C624.092 1019.67 624.395 1019.26 624.496 1019.13C624.701 1018.85 625.093 1018.79 625.37 1019C625.648 1019.2 625.708 1019.59 625.503 1019.87L625.502 1019.87C625.395 1020.01 625.081 1020.43 624.897 1020.67C624.527 1021.14 624.018 1021.77 623.466 1022.41C622.916 1023.04 622.312 1023.69 621.751 1024.19C621.471 1024.43 621.187 1024.66 620.916 1024.82C620.661 1024.97 620.339 1025.13 620 1025.12C619.661 1025.12 619.339 1024.97 619.084 1024.82C618.812 1024.66 618.529 1024.43 618.249 1024.19C617.688 1023.69 617.083 1023.04 616.534 1022.41C615.982 1021.77 615.473 1021.14 615.103 1020.67C614.919 1020.43 614.604 1020.01 614.498 1019.87L614.497 1019.87C614.292 1019.59 614.351 1019.2 614.629 1019C614.907 1018.79 615.298 1018.85 615.503 1019.13Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                <!-- 5. الرسالة -->
                <div class="form-group-item">
                  <label class="item-label" for="contact-message">{{ currentLang === 'ar' ? 'الرسالة' : 'Message' }}</label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    :placeholder="currentLang === 'ar' ? 'اكتب رسالتك أو استفسارك بالتفصيل هنا...' : 'Write your detailed message or inquiry here...'"
                    class="item-textarea"
                    :class="{ 'has-error': errors.message }"
                    required
                  ></textarea>
                  <span v-if="errors.message" class="inline-err-text">{{ errors.message }}</span>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="submit-action-btn" :disabled="isSubmitting || cooldownRemaining > 0">
                  <span v-if="isSubmitting" class="btn-spinner"></span>
                  <span>{{ submitButtonLabel }}</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Column 2 (Left in RTL): Direct Contact Information -->
          <div class="contact-info-col">
            <div class="info-header">
              <div class="info-title-row">
                <svg class="info-circle-svg" width="24" height="24" viewBox="490 606 24 24" fill="none" aria-hidden="true">
                  <path d="M501.491 617.751C501.422 617.75 501.341 617.75 501.242 617.75C500.828 617.75 500.492 617.414 500.492 617C500.492 616.586 500.828 616.25 501.242 616.25L501.277 616.25C501.482 616.25 501.704 616.25 501.891 616.275C502.11 616.304 502.39 616.38 502.626 616.616C502.862 616.852 502.938 617.132 502.967 617.351C502.992 617.539 502.992 617.76 502.992 617.966L502.992 623C502.992 623.414 502.656 623.75 502.242 623.75C501.828 623.75 501.492 623.414 501.492 623V618C501.492 617.901 501.492 617.821 501.491 617.751Z" fill="currentColor"/>
                  <path d="M501.992 613C501.44 613 500.992 613.448 500.992 614C500.992 614.552 501.44 615 501.992 615H502.001C502.553 615 503.001 614.552 503.001 614C503.001 613.448 502.553 613 502.001 613H501.992Z" fill="currentColor"/>
                  <path d="M491.25 618C491.25 623.937 496.063 628.75 502 628.75C507.937 628.75 512.75 623.937 512.75 618C512.75 612.063 507.937 607.25 502 607.25C496.063 607.25 491.25 612.063 491.25 618ZM502 627.25C496.891 627.25 492.75 623.109 492.75 618C492.75 612.891 496.891 608.75 502 608.75C507.109 608.75 511.25 612.891 511.25 618C511.25 623.109 507.109 627.25 502 627.25Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
                </svg>
                <h2 class="info-main-title">{{ currentLang === 'ar' ? 'معلومات الاتصال المباشر' : 'Direct Contact Information' }}</h2>
              </div>
              <p class="info-intro-text">
                {{ currentLang === 'ar'
                  ? 'تواصل معنا مباشرة عبر أي من قنوات الاتصال المتاحة. فريق الدعم متاح لخدمتكم والإجابة على استفساراتكم على مدار الساعة.'
                  : 'Contact us directly through any of the available channels. Our support team is available around the clock to assist you.'
                }}
              </p>
            </div>

            <!-- Contact Cards Stack -->
            <div class="contact-cards-stack">
              <!-- Card 1: الرقم المجاني الموحد -->
              <a v-if="contactPhone" :href="`tel:${contactPhone}`" class="contact-detail-card">
                <div class="detail-icon-wrap">
                  <svg width="24" height="24" viewBox="458 766 24 24" fill="none" aria-hidden="true">
                    <path d="M463.316 767.286C463.883 767.403 464.334 767.784 464.615 768.287L465.508 769.89C465.837 770.48 466.114 770.977 466.295 771.408C466.486 771.866 466.6 772.318 466.548 772.817C466.496 773.317 466.291 773.735 466.009 774.144C465.743 774.529 465.37 774.958 464.926 775.467L462.698 778.026C464.465 780.922 467.074 783.533 469.973 785.301L472.532 783.073C473.042 782.63 473.471 782.256 473.856 781.99C474.264 781.708 474.683 781.503 475.182 781.451C475.682 781.399 476.133 781.513 476.591 781.705C477.023 781.886 477.52 782.163 478.11 782.492L479.712 783.385C480.215 783.665 480.596 784.117 480.713 784.683C480.832 785.256 480.657 785.831 480.271 786.304C478.873 788.021 476.631 789.114 474.28 788.639C472.835 788.348 471.409 787.862 469.684 786.873C466.219 784.886 463.112 781.777 461.127 778.315C460.137 776.591 459.652 775.165 459.36 773.719C458.886 771.368 459.979 769.127 461.695 767.728C462.168 767.343 462.744 767.168 463.316 767.286ZM471.37 786.074C472.537 786.648 473.551 786.962 474.577 787.169C476.273 787.511 477.985 786.736 479.109 785.357C479.256 785.176 479.257 785.049 479.244 784.987C479.23 784.918 479.173 784.801 478.982 784.695L477.415 783.822C476.78 783.468 476.357 783.233 476.012 783.089C475.684 782.951 475.497 782.927 475.338 782.943C475.179 782.96 475 783.023 474.708 783.224C474.401 783.437 474.035 783.754 473.486 784.232L471.37 786.074ZM461.926 776.629L463.768 774.514C464.246 773.965 464.563 773.599 464.775 773.291C464.977 772.999 465.04 772.821 465.056 772.662C465.073 772.503 465.048 772.315 464.911 771.988C464.767 771.643 464.532 771.22 464.178 770.584L463.304 769.018C463.198 768.827 463.081 768.769 463.013 768.755C462.95 768.742 462.824 768.743 462.643 768.891C461.264 770.015 460.488 771.727 460.831 773.423C461.037 774.448 461.351 775.463 461.926 776.629Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
                  </svg>
                </div>
                <div class="detail-text-wrap">
                  <span class="detail-label">{{ currentLang === 'ar' ? 'الرقم المجاني الموحد' : 'Toll-Free Number' }}</span>
                  <span class="detail-val detail-phone phone-ltr" dir="ltr">{{ contactPhone }}</span>
                </div>
              </a>

              <!-- Card 2: الدعم عبر البريد الإلكتروني -->
              <div v-if="contactEmails.length" class="contact-detail-card">
                <div class="detail-icon-wrap">
                  <svg width="24" height="24" viewBox="458 886.5 24 24" fill="none" aria-hidden="true">
                    <path d="M472.92 889.287C470.967 889.238 469.033 889.238 467.08 889.287L467.022 889.288C465.497 889.327 464.27 889.357 463.287 889.529C462.257 889.708 461.42 890.052 460.714 890.761C460.01 891.468 459.668 892.293 459.492 893.305C459.324 894.27 459.299 895.467 459.267 896.95L459.266 897.008C459.245 898.005 459.245 898.995 459.266 899.992L459.267 900.05C459.299 901.533 459.324 902.73 459.492 903.695C459.668 904.707 460.01 905.532 460.714 906.239C461.42 906.948 462.257 907.292 463.287 907.471C464.27 907.643 465.497 907.673 467.022 907.712L467.08 907.713C469.033 907.762 470.967 907.762 472.92 907.713L472.978 907.712C474.503 907.673 475.73 907.643 476.713 907.471C477.743 907.292 478.58 906.948 479.286 906.239C479.99 905.532 480.332 904.707 480.508 903.695C480.676 902.73 480.701 901.533 480.733 900.05L480.734 899.992C480.755 898.995 480.755 898.005 480.734 897.008L480.733 896.95C480.701 895.467 480.676 894.27 480.508 893.305C480.332 892.293 479.99 891.468 479.286 890.761C478.58 890.052 477.743 889.708 476.713 889.529C475.73 889.357 474.503 889.327 472.978 889.288L472.92 889.287ZM467.118 890.786C469.046 890.738 470.954 890.738 472.882 890.786C474.479 890.826 475.595 890.856 476.456 891.006C477.283 891.15 477.799 891.394 478.224 891.82C478.398 891.995 478.541 892.183 478.658 892.398L472.717 895.764C471.462 896.476 470.7 896.75 470 896.75C469.3 896.75 468.538 896.476 467.283 895.764L461.342 892.398C461.459 892.182 461.602 891.995 461.776 891.82C462.201 891.394 462.717 891.15 463.544 891.006C464.405 890.856 465.521 890.826 467.118 890.786ZM460.921 893.884C460.818 894.676 460.795 895.676 460.766 897.04C460.745 898.015 460.745 898.985 460.766 899.96C460.799 901.515 460.824 902.598 460.97 903.438C461.109 904.242 461.349 904.751 461.776 905.18C462.201 905.606 462.717 905.85 463.544 905.994C464.405 906.144 465.521 906.174 467.118 906.214C469.046 906.262 470.954 906.262 472.882 906.214C474.479 906.174 475.595 906.144 476.456 905.994C477.283 905.85 477.799 905.606 478.224 905.18C478.651 904.751 478.891 904.242 479.03 903.438C479.176 902.598 479.201 901.515 479.234 899.96C479.255 898.985 479.255 898.015 479.234 897.04C479.205 895.677 479.182 894.676 479.079 893.884L473.457 897.07C472.164 897.802 471.113 898.25 470 898.25C468.888 898.25 467.837 897.802 466.543 897.07L460.921 893.884Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
                  </svg>
                </div>
                <div class="detail-text-wrap">
                  <span class="detail-label">{{ currentLang === 'ar' ? 'الدعم عبر البريد الإلكتروني' : 'Email Support' }}</span>
                  <a v-for="email in contactEmails" :key="email" :href="`mailto:${email}`" class="detail-val-link">{{ email }}</a>
                </div>
              </div>

              <!-- Card 3: الموقع والمكتب الرئيسي -->
              <div v-if="contactAddressParts.main" class="contact-detail-card">
                <div class="detail-icon-wrap">
                  <svg width="24" height="24" viewBox="458 1018 24 24" fill="none" aria-hidden="true">
                    <path d="M474.75 1025C474.75 1027.37 473.017 1029.33 470.75 1029.69L470.75 1036C470.75 1036.41 470.414 1036.75 470 1036.75C469.586 1036.75 469.25 1036.41 469.25 1036L469.25 1029.69C466.983 1029.33 465.25 1027.37 465.25 1025C465.25 1022.38 467.377 1020.25 470 1020.25C472.623 1020.25 474.75 1022.38 474.75 1025ZM470 1021.75C468.205 1021.75 466.75 1023.21 466.75 1025C466.75 1026.79 468.205 1028.25 470 1028.25C471.795 1028.25 473.25 1026.79 473.25 1025C473.25 1023.21 471.795 1021.75 470 1021.75Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
                    <path d="M465.75 1037C465.75 1036.59 465.414 1036.25 465 1036.25C464.586 1036.25 464.25 1036.59 464.25 1037C464.25 1037.55 464.531 1038 464.878 1038.32C465.222 1038.65 465.681 1038.91 466.186 1039.11C467.199 1039.52 468.548 1039.75 470 1039.75C471.452 1039.75 472.801 1039.52 473.814 1039.11C474.319 1038.91 474.778 1038.65 475.122 1038.32C475.469 1038 475.75 1037.55 475.75 1037C475.75 1036.59 475.414 1036.25 475 1036.25C474.586 1036.25 474.25 1036.59 474.25 1037C474.25 1037 474.25 1037.08 474.092 1037.23C473.931 1037.39 473.657 1037.56 473.257 1037.72C472.461 1038.04 471.31 1038.25 470 1038.25C468.69 1038.25 467.539 1038.04 466.743 1037.72C466.343 1037.56 466.069 1037.39 465.908 1037.23C465.75 1037.08 465.75 1037 465.75 1037Z" fill="currentColor"/>
                  </svg>
                </div>
                <div class="detail-text-wrap">
                  <span class="detail-label">{{ currentLang === 'ar' ? 'الموقع والمكتب الرئيسي' : 'Location & Headquarters' }}</span>
                  <span class="detail-val">{{ contactAddressParts.main }}</span>
                  <span v-if="contactAddressParts.sub" class="detail-sub">{{ contactAddressParts.sub }}</span>
                </div>
              </div>

              <!-- Card 4: ساعات العمل (set in the dashboard: working days, then Friday) -->
              <div v-if="contactHours.length" class="contact-detail-card" data-testid="contact-hours">
                <div class="detail-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 2"/>
                  </svg>
                </div>
                <div class="detail-text-wrap">
                  <span class="detail-label">{{ currentLang === 'ar' ? 'ساعات العمل' : 'Working Hours' }}</span>
                  <span v-for="line in contactHours" :key="line" class="detail-val">{{ line }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useLocalized } from '../../../composables/useLocalized';
import { useSEO } from '../../../composables/useSEO';
import { escapeHtml } from '../../../utils/sanitize';
import { settingsService } from '../../../services/settingsService';
import { firstSetting, settingsToObject } from '../../../utils/siteSettings';
import { workingHoursFor } from '../../../domain/site/siteIdentity.js';

const { currentLang } = useLocalized();

const contactSettings = ref({});
const siteImages = ref([]);

const localizedSetting = (arKey, enKey, fallback = '') => {
  const key = currentLang.value === 'ar' ? arKey : enKey;
  return contactSettings.value[key] || contactSettings.value[arKey] || contactSettings.value[enKey] || fallback;
};

const contactPhone = computed(() => firstSetting(contactSettings.value, 'site_contact_phone', 'support_phone', 'phone_number') || '');
const contactEmails = computed(() => {
  const values = [contactSettings.value.support_email, contactSettings.value.email]
    .flatMap((value) => String(value || '').split(/[\s,;،]+/))
    .map((value) => value.trim())
    .filter((value) => value.includes('@'));
  return [...new Set(values.map((value) => value.toLowerCase()))];
});

// The design shows the city line in bold and the building on its own muted line.
// When no separate details setting exists, split the address at its first comma.
const contactHours = computed(() => workingHoursFor(contactSettings.value, currentLang.value));

const contactAddressParts = computed(() => {
  const address = localizedSetting('address_ar', 'address_en', '').trim();
  const details = localizedSetting('contact_address_details_ar', 'contact_address_details_en', '').trim();
  if (details) return { main: address, sub: details };
  const match = address.match(/^(.+?)\s*[،,]\s*(.+)$/);
  return match ? { main: match[1], sub: match[2] } : { main: address, sub: '' };
});

const imageValue = (item) => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.image_url || item.url || item.image || item.path || item.file || '';
};

const contactHeroImage = computed(() => {
  const configured = firstSetting(contactSettings.value, 'contact_image', 'contact_hero_image', 'contact_banner');
  if (configured) return imageValue(configured);
  const match = siteImages.value.find((item) => {
    const searchable = [item.key, item.slug, item.type, item.section, item.name, item.title]
      .filter(Boolean).join(' ').toLowerCase();
    return searchable.includes('contact') || searchable.includes('support');
  });
  return imageValue(match) || '/images/support/hero_banner.jpg';
});

const fetchContactContent = async () => {
  const [settingsResult, imagesResult] = await Promise.allSettled([
    settingsService.getSettings(),
    settingsService.getSiteImages(),
  ]);
  if (settingsResult.status === 'fulfilled') {
    contactSettings.value = settingsToObject(settingsResult.value);
  }
  if (imagesResult.status === 'fulfilled') {
    siteImages.value = Array.isArray(imagesResult.value) ? imagesResult.value : [];
  }
};

onMounted(fetchContactContent);

useSEO({
  title: 'الدعم الفني وخدمة العملاء - متجر ماسترجاز Mastergas',
  description: 'فريق الدعم الفني في ماسترجاز متاح لمساعدتكم في اختيار وتشغيل وصيانة أفران الغاز والمسطحات الإيطالية بأعلى كفاءة. تواصل معنا مباشرة.',
  keywords: 'دعم فني ماسترجاز, صيانة أفران غاز, رقم ماسترجاز, خدمة عملاء ماسترجاز'
});

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: 'استفسار عن منتج',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const isSubmitting = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
const cooldownRemaining = ref(0);
let cooldownTimer = null;

const submitButtonLabel = computed(() => {
  if (isSubmitting.value) {
    return currentLang.value === 'ar' ? 'جاري الإرسال...' : 'Sending...';
  }
  if (cooldownRemaining.value > 0) {
    return currentLang.value === 'ar' 
      ? `إرسال الرسالة (${cooldownRemaining.value} ث)` 
      : `Send Message (${cooldownRemaining.value}s)`;
  }
  return currentLang.value === 'ar' ? 'إرسال الرسالة' : 'Send Message';
});

const sanitize = (val) => escapeHtml(String(val ?? '').trim());

const validateForm = () => {
  errors.name = '';
  errors.email = '';
  errors.phone = '';
  errors.message = '';
  let valid = true;

  if (!form.name.trim()) {
    errors.name = currentLang.value === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = currentLang.value === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    valid = false;
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = currentLang.value === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format';
    valid = false;
  }

  if (!form.phone.trim()) {
    errors.phone = currentLang.value === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    valid = false;
  } else if (form.phone.trim().length < 8) {
    errors.phone = currentLang.value === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number';
    valid = false;
  }

  if (!form.message.trim()) {
    errors.message = currentLang.value === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    valid = false;
  }

  return valid;
};

const startCooldown = (seconds = 30) => {
  cooldownRemaining.value = seconds;
  if (cooldownTimer) clearInterval(cooldownTimer);
  cooldownTimer = setInterval(() => {
    cooldownRemaining.value = Math.max(0, cooldownRemaining.value - 1);
    if (cooldownRemaining.value === 0) {
      clearInterval(cooldownTimer);
      cooldownTimer = null;
    }
  }, 1000);
};

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer);
});

const handleSubmit = async () => {
  successMsg.value = '';
  errorMsg.value = '';

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  try {
    const payload = {
      name: sanitize(form.name),
      email: sanitize(form.email).toLowerCase(),
      phone: sanitize(form.phone),
      subject: sanitize(form.subject) || (currentLang.value === 'ar' ? 'استفسار عن منتج' : 'Product inquiry'),
      message: sanitize(form.message)
    };

    await settingsService.sendContactMessage(payload);

    successMsg.value = currentLang.value === 'ar'
      ? 'تم استلام رسالتك بنجاح! سيتواصل معك فريق الدعم الفني في أقرب وقت.'
      : 'Your message has been received! Our support team will contact you shortly.';

    // Reset Form
    form.name = '';
    form.email = '';
    form.phone = '';
    form.subject = 'استفسار عن منتج';
    form.message = '';

    startCooldown(30);
  } catch (err) {
    console.error('Contact submission error', err);
    errorMsg.value = err.response?.data?.message || (
      currentLang.value === 'ar'
        ? 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى لاحقاً.'
        : 'An error occurred while sending your message. Please try again later.'
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  background-color: #ffffff;
  min-height: 100vh;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  color: #000000;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px;
}

/* 1. Hero Banner Section */
.support-hero-banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-top: 120px; /* Offset for 40px top-bar + 80px navbar */
  background-color: var(--color-brand-primary, #000000);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero-content {
  max-width: 760px;
}

.hero-subheading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.subheading-line {
  width: 32px;
  height: 1px;
  background-color: #ffffff;
}

.subheading-text {
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #ffffff;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin: 28px 0 28px;
  line-height: 1.2;
}

.hero-desc {
  font-size: 18px;
  color: #ffffff;
  font-weight: 400;
  line-height: 28px;
  margin: 0;
  opacity: 0.9;
}

/* 2. Main Section */
.support-main-section {
  padding: 80px 0;
  background: #ffffff;
}

.support-layout-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 450px;
  gap: 48px;
  align-items: start;
}

/* Contact Information Column */
.contact-info-col {
  display: flex;
  flex-direction: column;
}

.info-header {
  margin-bottom: 24px;
}

.info-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-circle-svg {
  color: #000000;
  flex-shrink: 0;
}

.info-main-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: #000000;
  margin: 0;
}

.info-intro-text {
  font-size: 16px;
  color: #64748b;
  line-height: 24px;
  margin: 24px 0 0;
}

/* Stack of Cards */
.contact-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-detail-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 19px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;
}

.contact-detail-card:hover {
  border-color: #cbd5e1;
}

.detail-text-wrap {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.detail-label {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #64748b;
}

.detail-val {
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  color: #000000;
}

.detail-val.detail-phone {
  font-size: 20px;
  font-weight: 500;
}

.phone-ltr {
  direction: ltr;
  unicode-bidi: isolate;
  align-self: flex-start;
}

.detail-val-link {
  font-size: 16px;
  font-weight: 600;
  line-height: 27px;
  color: #000000;
  text-decoration: none;
  direction: ltr;
  unicode-bidi: isolate;
  align-self: flex-start;
  overflow-wrap: anywhere;
  transition: color 0.15s;
}

.detail-val-link + .detail-val-link {
  margin-top: -3px;
}

.detail-val-link:hover {
  text-decoration: underline;
}

.detail-sub {
  font-size: 13px;
  line-height: 19px;
  color: #64748b;
}

.detail-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #000000;
}

/* Form Box Card */
.contact-form-col {
  width: 100%;
  min-width: 0;
}

.form-box-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 31px;
}

.form-box-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 23px;
}

.headset-svg {
  color: #000000;
  flex-shrink: 0;
}

.form-box-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: #000000;
  margin: 0;
}

/* Alerts */
.custom-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.success-alert {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.error-alert {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

/* Form Fields */
.main-contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-label {
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #000000;
}

.item-input,
.item-select,
.item-textarea {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 14px;
  color: #000000;
  background: #ffffff;
  outline: none;
  transition: border-color 0.2s ease;
}

.item-input {
  height: 44px;
  padding: 0 16px;
}

.item-input::placeholder,
.item-textarea::placeholder {
  color: #64748b;
  opacity: 1;
}

.item-input:focus,
.item-select:focus,
.item-textarea:focus {
  border-color: #000000;
}

.item-input.has-error,
.item-textarea.has-error {
  border-color: #ef4444;
}

.input-ltr {
  direction: ltr;
  text-align: right;
}

[dir="ltr"] .input-ltr {
  text-align: left;
}

/* Select Container */
.select-container {
  position: relative;
  width: 100%;
}

.item-select {
  height: 44px;
  padding: 0 16px;
  padding-inline-end: 48px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.select-arrow-svg {
  position: absolute;
  inset-inline-end: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
  pointer-events: none;
}

/* Textarea */
.item-textarea {
  height: 120px;
  min-height: 120px;
  padding: 12px 16px;
  resize: vertical;
  line-height: 22px;
  display: block;
}

.inline-err-text {
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
}

/* Submit Button */
.submit-action-btn {
  width: 100%;
  height: 56px;
  background: var(--color-brand-primary, #000000);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}

.submit-action-btn:hover:not(:disabled) {
  background: var(--color-button-hover);
}

.submit-action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .container {
    padding: 0 32px;
  }
  .support-layout-grid {
    grid-template-columns: minmax(0, 1fr) 380px;
    gap: 32px;
  }
}

@media (max-width: 1024px) {
  .support-hero-banner {
    margin-top: 0;
  }
}

@media (max-width: 960px) {
  .support-hero-banner {
    height: 320px;
  }
  .hero-title {
    font-size: 36px;
    margin: 16px 0 12px;
  }
  .hero-desc {
    font-size: 16px;
    line-height: 26px;
  }
  .support-main-section {
    padding: 48px 0 64px;
  }
  .support-layout-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 16px;
  }
  .form-box-card {
    padding: 23px 19px;
  }
  .info-main-title,
  .form-box-title {
    font-size: 20px;
    line-height: 30px;
  }
  .info-intro-text {
    font-size: 15px;
    margin-top: 16px;
  }
}
</style>
