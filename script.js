const progress = document.querySelector('.progress');
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('in');
  });
},{threshold:.12});
revealEls.forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY/max)*100 : 0}%`;
},{passive:true});

// Add extra visual slots without touching HTML.
document.querySelectorAll('.add-image').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const gallery = btn.previousElementSibling;
    const project = btn.closest('[data-project]').dataset.project;
    const index = gallery.children.length + 1;
    const slot = document.createElement('button');
    slot.className = 'media-slot';
    slot.type = 'button';
    slot.innerHTML = `<span>${String(index).padStart(2,'0')}</span><b>Add campaign image</b><small>Replace assets/${project}-${String(index).padStart(2,'0')}.jpg</small>`;
    gallery.appendChild(slot);
  });
});

// Automatically display images when the expected files exist.
// Browsers cannot reliably test local files, so use these by replacing each media-slot
// with: style="background-image:url('assets/project-01.jpg')" and remove its text.
