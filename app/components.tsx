"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { achievements, certifications, internships, projects, skills } from "./data";

const nav = [
  ["01", "About", "about"], ["02", "Experience", "experience"], ["03", "Projects", "work"],
  ["04", "Achievements", "achievements"], ["05", "Certifications", "certifications"], ["06", "Resume", "blueprint"], ["07", "Contact", "contact"]
];

function Loader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setHidden(true), reducedMotion ? 250 : 1200);
    return () => window.clearTimeout(timer);
  }, []);
  if (hidden) return null;
  return <div className="entry-experience is-loading" aria-label="Entering Thanushree's digital workshop">
    <div className="entry-copy"><strong>THANUSHREE'S</strong><span>DIGITAL WORKSHOP</span></div>
  </div>;
}

function EntryTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const node = overlay.current;
    const stage = document.querySelector(".entry-stage");
    const main = document.querySelector("main");
    if (!node || !stage || !main) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setComplete(true);
      main.classList.remove("entry-pending");
      return;
    }
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const range = Math.max(window.innerHeight, stage.getBoundingClientRect().height);
      const progress = Math.min(1, Math.max(0, window.scrollY / range));
      node.style.setProperty("--entry-progress", progress.toString());
      node.style.setProperty("--iris-size", `${Math.min(155, 4 + progress * 155)}%`);
      if (progress >= 1) {
        setComplete(true);
        main.classList.remove("entry-pending");
      } else {
        setComplete(false);
        main.classList.add("entry-pending");
      }
    };
    const onScroll = () => { if (frame === null) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame !== null) window.cancelAnimationFrame(frame); };
  }, []);
  return <>
    <section className="entry-stage" aria-label="Enter the digital workshop" />
    <div className={`entry-transition ${complete ? "is-complete" : ""}`} ref={overlay} aria-hidden="true">
      <div className="entry-wash" />
      <div className="entry-polaroid identity-slip">
        <div className="avatar-photo-frame"><div className="avatar-photo"><img className="avatar-image" src="/avatar.jpg" alt="" /><span>PHOTO<br />01</span><b>TS</b></div></div>
        <p>CS Engineering Student (3rd year)</p><small>WORKSHOP ID / 2024-2028</small>
      </div>
    </div>
  </>;
}

function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    };
    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a, button, [data-cursor]") as HTMLElement | null;
      if (!cursor.current) return;
      cursor.current.dataset.label = target?.dataset.cursor || (target ? "VIEW" : "");
      cursor.current.classList.toggle("is-active", Boolean(target));
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); };
  }, []);
  return <div className="cursor" ref={cursor} aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#top"><span>TS</span><b>DIGITAL<br />WORKSHOP</b></a>
    <button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MENU"}</button>
    <nav id="site-nav" className={open ? "open" : ""} aria-label="Primary navigation">
      {nav.map(([number, label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><small>{number}</small>{label}</a>)}
    </nav>
  </header>;
}

function SectionHead({ index, eyebrow, title }: { index: string; eyebrow: string; title: React.ReactNode }) {
  return <div className="section-head reveal"><span>{index} / 06</span><p>{eyebrow}</p><h2>{title}</h2></div>;
}

function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.closest("section")?.classList.add("section-visible");
      }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

function AvatarReveal() {
  const photo = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const frameRequest = useRef<number | null>(null);
  const point = useRef({ x: 0, y: 0 });

  const updateReveal = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = photo.current?.getBoundingClientRect();
    if (!bounds || !reveal.current) return;
    point.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    if (frameRequest.current === null) {
      frameRequest.current = window.requestAnimationFrame(() => {
        if (reveal.current) {
          reveal.current.style.setProperty("--reveal-x", `${point.current.x}px`);
          reveal.current.style.setProperty("--reveal-y", `${point.current.y}px`);
        }
        frameRequest.current = null;
      });
    }
  };

  const stopReveal = () => frame.current?.classList.remove("is-revealing");
  useEffect(() => () => { if (frameRequest.current !== null) window.cancelAnimationFrame(frameRequest.current); }, []);

  return <div className="avatar-photo-frame" ref={frame} onPointerEnter={() => frame.current?.classList.add("is-revealing")} onPointerMove={updateReveal} onPointerDown={(event) => { frame.current?.classList.add("is-revealing"); updateReveal(event); }} onPointerLeave={stopReveal} onPointerCancel={stopReveal}>
    <div className="avatar-photo" ref={photo}>
      <img className="avatar-image" src="/avatar.jpg" alt="Thanushree Suresh avatar" />
      <div className="real-photo-reveal" ref={reveal} aria-hidden="true"><img src="/actual.jpg" alt="" /></div>
      <span>PHOTO<br />01</span><b>TS</b>
    </div>
  </div>;
}

function CertificateViewer({ file, name, onClose }: { file: string; name: string; onClose: () => void }) {
  const isPdf = file.toLowerCase().endsWith(".pdf");
  return <div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title">
    <div className="certificate-modal-backdrop" onClick={onClose} />
    <div className="certificate-modal-content">
      <div className="certificate-modal-head"><h2 id="certificate-title">{name}</h2><button type="button" onClick={onClose} aria-label="Close certificate viewer">CLOSE</button></div>
      {isPdf ? <iframe src={file} title={`${name} certificate`} /> : <img src={file} alt={`${name} certificate`} />}
    </div>
  </div>;
}

function Certifications() {
  const [activeCertificate, setActiveCertificate] = useState<{ file: string; name: string } | null>(null);
  return <section className="certifications section-motion" id="certifications" aria-labelledby="certifications-title">
    <SectionHead index="05" eyebrow="DOCUMENTS FROM THE WORKSHOP" title={<>The certification<br /><em>drawer.</em></>} />
    <div className="cert-drawer-grid">
      {certifications.map((certification, index) => <article className="cert-drawer reveal" key={certification.name}>
        <span>CERTIFICATE / 0{index + 1}</span>
        <h3 id={index === 0 ? "certifications-title" : undefined}>{certification.name}</h3>
        {certification.status === "available" && certification.certificateFile ? <button type="button" className="certificate-action" onClick={() => setActiveCertificate({ file: certification.certificateFile!, name: certification.name })}>VIEW CERTIFICATE ↗</button> : <p className="certificate-status">Certificate document coming soon</p>}
      </article>)}
    </div>
    {activeCertificate && <CertificateViewer {...activeCertificate} onClose={() => setActiveCertificate(null)} />}
  </section>;
}

export default function Workshop() {
  return <>
    <Loader /><EntryTransition /><Cursor /><RevealObserver /><Header />
    <main id="top" className="entry-pending">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker"><span>EST. 2006</span><span>THRISSUR, KERALA, INDIA</span></div>
        <nav className="hero-nav" aria-label="Section navigation">
          {nav.map(([number, label, id]) => <a key={id} href={`#${id}`}><small>{number}</small>{label}</a>)}
        </nav>
        <h1 id="hero-title"><span>THANUSHREE</span><span>SURESH<i>*</i></span></h1>
        <div className="hero-lower">
           <div className="identity-slip" data-cursor="EXPLORE">
             <AvatarReveal />
            <p>CS Engineering Student (3rd year)</p>
            <small>WORKSHOP ID / 2024-2028</small>
          </div>
          <div className="hero-statement">
            <p>A digital space for building ideas, experimenting with technology, and solving real-world problems.</p>
            <div><span>DATA</span><span>CODE</span><span>AI</span><span>APPLICATIONS</span><span>PROBLEM SOLVING</span></div>
          </div>
        </div>
        <a className="scroll-note" href="#about">SCROLL TO ENTER <span>↓</span></a>
      </section>

      <section className="about section-motion" id="about">
        <SectionHead index="01" eyebrow="THE PERSON BEHIND THE WORKBENCH" title={<>Ideas begin with<br /><em>curiosity.</em></>} />
        <div className="about-copy reveal">
          <span className="annotation">PROFESSIONAL SUMMARY ↘</span>
          <p>Motivated Computer Science Engineering student with hands-on experience in AI integration, Java, Python, SQL,web development and Data Analytics. Passionate about building user-focused applications and solving real-world problems. Seeking internship opportunities.</p>
        </div>
        <div className="about-rule" aria-hidden="true" />
        <aside className="education-note reveal">
          <small>EDUCATION / BLUEPRINT 01</small>
          <h3>B.Tech in Computer Science Engineering</h3>
          <p>Sahrdaya College of Engineering and Technology</p>
          <b>2024-2028</b>
        </aside>
      </section>

      <section className="playground section-motion" id="playground">
        <SectionHead index="03" eyebrow="THE PLAYGROUND" title={<>Where ideas get<br /><em>tested.</em></>} />
        <div className="play-board reveal">
          <p>AI Agent Architect</p><p>Multimodal AI</p><p>Flutter</p><p>Data Analytics</p><p>Hackathons</p><p>Accessibility-focused design</p>
          <span className="scribble">actual tools + arenas<br />from the workshop</span>
        </div>
      </section>

      <section className="toolbox section-motion" id="toolbox">
        <SectionHead index="04" eyebrow="TOOLS ON MY DESK" title={<>The <em>toolbox.</em></>} />
        <div className="tool-list">
          {skills.map(([category, items], index) => <div className="tool-row reveal" key={category}><span>0{index + 1}</span><h3>{category}</h3><p>{items}</p></div>)}
        </div>
      </section>

      <section className="work section-motion" id="work">
        <SectionHead index="02" eyebrow="THINGS I'VE BUILT" title={<>Selected <em>work</em><br />from the bench.</>} />
        <div className="project-shelf">
          {projects.slice(0, 4).map((project, index) => <Link className={`project-piece ${project.tone} reveal`} href={`/projects/${project.slug}`} key={project.slug} data-cursor="OPEN →">
            <span className="project-number">0{index + 1}</span><small>{project.note}</small>
            <h3>{project.name}</h3><h4>{project.descriptor}</h4><p>{project.description}</p><i>OPEN CASE FILE →</i>
          </Link>)}
        </div>
        <div className="additional-work reveal">
          <p>ADDITIONAL PROJECTS / 03</p>
          {projects.slice(4).map((project, index) => <Link href={`/projects/${project.slug}`} key={project.slug} data-cursor="OPEN →"><span>0{index + 5}</span><strong>{project.name}</strong><small>{project.tech || project.descriptor}</small><b>↗</b></Link>)}
        </div>
      </section>

      <section className="wins section-motion" id="achievements" aria-labelledby="wins-title">
        <div className="wins-title reveal"><p>ARCHIVE / RECOGNITION</p><h2 id="wins-title">THE WALL<br /><em>OF WINS</em></h2></div>
        <div className="win-wall">
          {achievements.map((achievement, index) => <article className="win-note reveal" key={achievement}><span>AWARD 0{index + 1}</span><p>{achievement}</p><i>★</i></article>)}
        </div>
      </section>

       <Certifications />

       <section className="internships section-motion" id="experience">
         <div className="learning-title reveal"><small>FIELD NOTES / EXPERIENCE</small><h2>THINGS I'VE LEARNED<br /><em>OUTSIDE THE CLASSROOM</em></h2></div>
         <div className="learning-log">
           {internships.map(([name, detail], index) => <article className="reveal" key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p></article>)}
         </div>
       </section>

       <section className="blueprint section-motion" id="blueprint">
         <SectionHead index="06" eyebrow="MY BLUEPRINT" title={<>The full story,<br /><em>on paper.</em></>} />
         <div className="resume-sheet reveal">
           <span>DOCUMENT / RESUME</span><h3>THANUSHREE<br />SURESH</h3><p>CS Engineering Student (3rd year) | Flutter &amp; AI Developer</p>
           <div className="resume-lines" aria-hidden="true"><i /><i /><i /><i /></div>
           <div className="resume-actions"><a href="/resume.pdf" target="_blank" rel="noreferrer">VIEW RESUME ↗</a><a href="/resume.pdf" download="Thanushree-Suresh-Resume.pdf">DOWNLOAD RESUME ↓</a></div>
         </div>
       </section>

      <section className="contact section-motion" id="contact">
        <p className="reveal">06 / THE WORKSHOP DOOR</p><h2 className="reveal">LET'S BUILD<br /><em>SOMETHING</em><br />THOUGHTFUL.</h2>
        <div className="contact-row reveal"><a href="mailto:thanushreesuresh2006@gmail.com" data-cursor="WRITE →">thanushreesuresh2006@gmail.com <span>↗</span></a><p>Thrissur, Kerala, India</p></div>
        <footer><span>THANUSHREE'S DIGITAL WORKSHOP</span><span>2026 / KERALA, INDIA</span><a href="#top">BACK TO THE DOOR ↑</a></footer>
      </section>
    </main>
  </>;
}
