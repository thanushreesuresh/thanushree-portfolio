import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../data";

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <main className={`case-study ${project.tone}`}>
    <header className="case-header"><Link href="/">← BACK TO WORKSHOP</Link><span>CASE FILE / {project.note}</span></header>
    <div className="case-body">
      <section className="case-intro"><p className="case-kicker">PROJECT SPECIMEN / {project.tone.toUpperCase()}</p><h1>{project.name}</h1><h2>{project.descriptor}</h2></section>
      <section className="case-grid"><div><span className="case-label">THE WORK</span><p className="case-description">{project.description}</p>{project.features && <p>{project.features}</p>}</div><aside><span>TECH / MATERIALS</span><strong>{project.tech || "As stated in the resume"}</strong><span>PROJECT NOTE</span><strong>{project.note}</strong></aside></section>
      <section className="case-closing"><span className="case-label">WORKSHOP ARCHIVE</span><p>This case file is part of Thanushree's Digital Workshop.</p><Link href="/" data-cursor="BACK →">RETURN TO THE WORKSHOP →</Link></section>
      <div className="case-stamp">WORK<br />BUILT</div>
    </div>
  </main>;
}
