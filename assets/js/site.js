(function(){
  const doc=document;
  const root=doc.documentElement;

  function setFooterYear(){
    const el=doc.getElementById('footer-year');
    if(el){
      el.textContent=new Date().getFullYear()+" · Frankfurt, Germany";
    }
  }

  function initLoader(){
    const loader=doc.getElementById('pre-load');
    if(!loader){return;}
    let hidden=false;
    const hide=function(){
      if(hidden){return;}
      hidden=true;
      loader.classList.add('loader--hidden');
      setTimeout(function(){loader.remove();},600);
    };
    const fontReady=doc.fonts&&doc.fonts.ready;
    if(fontReady&&typeof fontReady.then==='function'){
      fontReady.then(hide).catch(hide);
    }else{
      window.addEventListener('load',hide);
    }
    setTimeout(hide,4000);
  }

  function initConsent(){
    const banner=doc.getElementById('cookie-consent');
    const accept=doc.getElementById('consent-accept');
    const decline=doc.getElementById('consent-decline');
    const gtagScript=doc.getElementById('gtag-script');
    const key='ay_ga_consent';
    if(!banner||!accept||!decline||!gtagScript){return;}
    function loadAnalytics(accepted){
      if(accepted){
        gtagScript.innerHTML="window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2R92LFMXD5');";
        gtagScript.setAttribute('async','');
        gtagScript.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=G-2R92LFMXD5');
      }else{
        window['ga-disable-G-2R92LFMXD5']=true;
      }
    }
    const stored=localStorage.getItem(key);
    if(stored==='accepted'){
      loadAnalytics(true);
    }else if(stored==='declined'){
      loadAnalytics(false);
    }else{
      banner.style.display='flex';
    }
    accept.addEventListener('click',function(){
      localStorage.setItem(key,'accepted');
      loadAnalytics(true);
      banner.style.display='none';
    });
    decline.addEventListener('click',function(){
      localStorage.setItem(key,'declined');
      loadAnalytics(false);
      banner.style.display='none';
    });
  }

  function initEmail(){
    const link=doc.getElementById('email-link');
    const meta=doc.getElementById('email-meta');
    if(!link||!meta){return;}
    const user='artyom.yagovdik';
    const domain='gmail.com';
    link.addEventListener('click',function(event){
      event.preventDefault();
      window.location.href='mailto:'+user+'@'+domain;
    });
    meta.textContent+=user+'@'+domain;
  }

  function initTheme(){
    const btn=doc.getElementById('theme-toggle-btn');
    const label=doc.getElementById('theme-toggle-label');
    if(!btn||!label){return;}
    const hevyIcon=doc.getElementById('hevy-icon');
    const key='ay_theme';
    const stored=localStorage.getItem(key);
    let userSelection=stored||null;
    function setHevyIcon(theme){
      if(!hevyIcon){return;}
      const src=theme==='dark'?hevyIcon.dataset.darkSrc:hevyIcon.dataset.lightSrc;
      if(src&&hevyIcon.getAttribute('src')!==src){
        hevyIcon.setAttribute('src',src);
      }
    }
    function applyTheme(theme){
      root.setAttribute('data-theme',theme);
      label.textContent=theme;
      setHevyIcon(theme);
    }
    const current=root.getAttribute('data-theme')||'light';
    applyTheme(stored||current);
    const media=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
    function handleSystem(event){
      if(userSelection){return;}
      applyTheme(event.matches?'dark':'light');
    }
    if(media){
      if(typeof media.addEventListener==='function'){
        media.addEventListener('change',handleSystem);
      }else if(typeof media.addListener==='function'){
        media.addListener(handleSystem);
      }
    }
    btn.addEventListener('click',function(){
      const next=(root.getAttribute('data-theme')||'light')==='light'?'dark':'light';
      userSelection=next;
      applyTheme(next);
      localStorage.setItem(key,next);
    });
  }

  function initHiddenLinks(){
    const trigger=doc.querySelector('[data-secret-trigger]');
    if(!trigger){return;}
    const links=['fragrantica-link','telegram-link','instagram-link']
      .map(function(id){return doc.getElementById(id);})
      .filter(Boolean);
    const container=doc.querySelector('.links');
    if(!links.length||!container){return;}
    let clicks=0;
    let revealed=false;
    trigger.addEventListener('click',function(){
      clicks+=1;
      if(!revealed&&clicks===3){
        links.forEach(function(link){
          link.classList.remove('is-hidden');
          container.appendChild(link);
        });
        revealed=true;
      }
    });
  }

  function initPrint(){
    const btn=doc.getElementById('print-btn');
    if(btn){
      btn.addEventListener('click',function(){
        window.print();
      });
    }
  }

  document.addEventListener('DOMContentLoaded',function(){
    setFooterYear();
    initLoader();
    initConsent();
    initEmail();
    initTheme();
    initHiddenLinks();
    initPrint();
  });
})();
