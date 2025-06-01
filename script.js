// Lucide アイコンの初期化
document.addEventListener('DOMContentLoaded', function() {
    // lucide is assumed to be globally available, ensure it's loaded correctly.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error('Lucide is not defined. Ensure it is properly loaded.');
    }
});

// スムーズスクロール関数
function scrollToForm() {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
        formElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ナビゲーションリンクのスムーズスクロール
document.addEventListener('DOMContentLoaded', function() {
    // 内部リンクのスムーズスクロール
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // モバイルメニューの実装（基本的な表示/非表示）
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            
            // モバイル表示時のスタイル調整
            if (nav.style.display === 'flex') {
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.backgroundColor = 'white';
                nav.style.flexDirection = 'column';
                nav.style.padding = '1rem';
                nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                nav.style.zIndex = '50';
            }
        });
    }
    
    // スクロール時のヘッダー効果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール方向に応じてヘッダーの透明度を調整
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // カードのホバー効果の強化
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 結果カードのアニメーション
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // フォームの高さ調整（レスポンシブ対応）
    function adjustFormHeight() {
        const iframe = document.querySelector('.contact-iframe');
        if (iframe && window.innerWidth < 768) {
            iframe.style.height = '600px';
        } else if (iframe) {
            iframe.style.height = '800px';
        }
    }
    
    // 初期実行とリサイズ時の実行
    adjustFormHeight();
    window.addEventListener('resize', adjustFormHeight);
    
    // インターセクションオブザーバーでアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素の設定
    const animateElements = document.querySelectorAll('.problem-card, .result-card, .achievement-card, .online-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    // ローディング完了後の処理があればここに追加
    console.log('英会話コーチングLPが読み込まれました');
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
});

// パフォーマンス最適化：画像の遅延読み込み
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});