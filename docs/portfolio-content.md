# Rajesh Kadiyala — Complete Portfolio Content
### Written by: Portfolio Content Strategist + Technical Storyteller + Recruiter-Minded Copywriter

---

## PERSONAL BRAND SUMMARY

**Who you actually are (the honest read from your work):**
You are an AI/ML engineer with real full-stack delivery capability. You've trained multi-model deep learning pipelines (Mask R-CNN + ResNet-50 + BERT), built a production desktop application with a real business behind it (Le Frut POS), and you can execute end-to-end — from model architecture to UI to database schema to deployment. That's not common. Most ML people can't ship a product. Most frontend people can't train a model. You can do both.

**Your unique positioning:**
> "AI engineer who actually ships — from model to UI to deployed product."

That's the lane. It's real, it's rare, and it's defensible.

**What to emphasize:** Le Frut POS (production, real business, full TypeScript/React/Electron/Supabase stack), Dental Caries Detection (real ML pipeline with three models working together), Neural Style Transfer research (shows ML depth), MCQ Generator (shows NLP + practical tooling).

**What to minimize or reframe:** "Operations Executive" (keep but reframe as early startup experience), "Graphic Designer Freelance" (remove or fold into creative problem-solving ability), high school education line (cut it entirely).

---

## TONE DIRECTION

**Voice:** Calm confidence. Technical but not cold. Precise but not robotic.

**Personality style:** The engineer who's thought carefully about what they're building and why — not performing enthusiasm, just showing the work.

**Writing rules:**
- Short sentences land harder than long ones
- Lead with what you built, not what you "hope to do"
- Let the technology choices explain your thinking
- Never say "passionate," "driven," "innovative," or "leverage"
- Use "I built," "I decided," "I chose," "I shipped" — active ownership language

---

---

# SECTION 1: HERO

---

## Headline Options

**Option A (Recommended — clean, confident, specific):**
> I build AI systems that work in the real world.

**Option B (Positions the full-stack AI angle):**
> From model training to production UI — I build the whole thing.

**Option C (More personal, slightly warmer):**
> AI/ML Engineer. I write models, ship products, and care about how both work.

---

## Subheadline

> Full-stack AI engineer specializing in Computer Vision, NLP, and production web applications. Based in Vijayawada, India.

---

## Short Introduction (Hero paragraph — 2–3 sentences max)

> I work at the intersection of machine learning and product engineering. On one side: training deep learning pipelines for real detection and classification problems. On the other: building the interfaces and backend systems that make those models useful to actual people.

---

## CTA Suggestions

**Primary CTA:** `View My Work`
**Secondary CTA:** `Download Resume`
**Tertiary (contact anchor):** `Let's Talk`

---

---

# SECTION 2: ABOUT

---

## About Section — Full Write

Most people who study ML stop at Jupyter notebooks. I didn't find that satisfying.

What I actually care about is finishing things — not just training a model, but building the system around it that makes it usable. That's why my projects tend to go all the way: from dataset preparation and model architecture to a working interface someone can actually open and use.

My background is in AI and Machine Learning from Usha Rama College of Engineering, where I focused on computer vision and NLP. But a lot of what I know came from building things that needed to work — not just pass a validation metric.

**Le Frut POS** taught me what production software actually means. It's a full desktop POS system (React + TypeScript + Electron + Supabase) that I built for a real fruit shop operation. It handles transactions, inventory, thermal receipt printing, real-time analytics, and offline-capable operations. There was no spec document — just a business with real constraints and real users. I figured out the architecture, wrote the SQL schema, handled auth with RLS, and shipped a `.exe` that runs without installation. That was a different kind of education.

**The dental caries detection project** was where I went deep on production ML. Three models working together — Mask R-CNN for detection and segmentation, ResNet-50 for severity classification, and a fine-tuned BERT model for generating personalized clinical recommendations. The hard part wasn't picking the architectures. It was getting them to work together coherently and handling a heavily imbalanced dataset with class-weighted loss and targeted augmentation.

I'm interested in roles where there's real technical ownership — where I can contribute to both the model layer and the product layer, not just one or the other.

Outside of coding, I think about design. I care about the gap between something that technically works and something that actually feels right to use. That instinct shapes every interface and API I build.

---

---

# SECTION 3: EXPERIENCE

---

## Experience Rewrites

---

### Operations Executive — Lufrat
*Apr 2025 – Mar 2026*

Early-stage role at a small business operation where I wore multiple hats — coordinating daily operations, supporting product decisions, and building internal tooling. This is also where I developed and deployed Le Frut POS, a full desktop point-of-sale system that replaced manual transaction tracking and became the core operational software for the business.

**Reframe note:** The POS system is the story here. Lead with that. The "operations executive" title is less important than the fact that you identified a problem, built the solution, and deployed it into a live business.

---

### Data Analytics Intern — 3RDSYTMS
*Jan 2025 – Nov 2025*

Worked with business data pipelines and visualization tooling. Built and maintained dashboards for tracking operational KPIs. Developed hands-on familiarity with data cleaning, transformation, and presenting findings to non-technical stakeholders.

**Note:** If you have any specific metrics, tools used (Power BI? Pandas? SQL?), or one specific analysis you ran — add it. One concrete thing makes this 3x more credible.

---

### Freelance — Graphic Design
*(Remove from portfolio entirely, or fold into a single line)*

**Recommended reframe if you keep it:**
Early client work in visual communication — brand identity, print collateral, digital assets. Developed an eye for layout, hierarchy, and user-facing design that now informs how I approach UI architecture.

---

---

# SECTION 4: PROJECTS

---

## PROJECT 1 — Le Frut POS
**The flagship. Lead with this.**

### Short Summary
A complete point-of-sale and inventory management system built for a real fruit shop business. Fully deployed as a standalone Windows desktop application — no installation required.

### The Full Write

There was no off-the-shelf POS system that fit what this business needed. Existing solutions were either too expensive, too bloated, or required internet connectivity that wasn't reliable. So I built one from scratch.

Le Frut POS is a full-featured desktop application handling everything a small retail operation needs: product management, cart and transaction processing, multiple payment methods (Cash, UPI, Card), thermal receipt printing for 58mm and 80mm printers, daily sales reporting, and real-time inventory tracking.

**The technical decisions that mattered:**

I chose React + TypeScript for the frontend because type safety matters when you're handling financial data — a mistyped price field has real consequences. Supabase gave me a PostgreSQL backend with row-level security and real-time subscriptions without the overhead of managing a server. Electron wrapped it into a distributable `.exe` that the business owner can run on any Windows machine without any setup.

For performance, I implemented virtualized product grids using `react-window` — the system handles 100+ products without any rendering lag. Search is debounced at 300ms. Database queries run against indexed columns. These aren't over-engineering — they're what separates software that feels fast from software that feels like it's thinking.

The schema covers five tables with clear relationships: products, transactions, transaction_items, shop_expenses, and other_sales. RLS policies ensure data is user-scoped. Draft orders, packing slips, receipt reprints, bulk CSV import, keyboard shortcuts for every major action — the kind of completeness that only comes from building something a real person uses every day.

**Stack:** TypeScript · React 18 · Electron · Supabase (PostgreSQL + RLS) · Tailwind CSS · Vite · react-window

**Repo:** [github.com/rajeshkadiyalaaa/lefrut-pos](https://github.com/rajeshkadiyalaaa/lefrut-pos)

---

## PROJECT 2 — Dental Caries Detection & Recommendation System

### Short Summary
A three-model deep learning pipeline for dental X-ray analysis — detecting cavities, classifying severity, and generating personalized clinical recommendations.

### The Full Write

Dental caries affects over 3.5 billion people globally. Early detection significantly changes outcomes, but access to expert dental radiograph interpretation is uneven. This project is an attempt to automate part of that diagnostic process.

The system works in three stages, each handled by a specialized model:

**Detection (Mask R-CNN):** The first model locates and segments cavity regions in dental X-rays. I used a ResNet-50-FPN backbone with ROI Align for precise spatial localization — important when you need to know not just *that* there's a cavity, but *where* and *how large*. Output is bounding boxes plus instance segmentation masks.

**Classification (ResNet-50):** A fine-tuned ResNet-50 classifier takes the detected regions and categorizes severity into four levels: normal, superficial, medium, and deep. The dataset (681 images from Dental AI Dataset V4 Augmented) had significant class imbalance — only 15 normal cases against 258 deep caries cases. I addressed this with class-weighted loss during training and targeted augmentation: random rotations, flips, brightness/contrast adjustments, and Gaussian noise.

**Recommendation (BERT):** The final model generates personalized clinical advice based on the severity classification. Rather than static lookup tables, I fine-tuned a BERT-base model on dental recommendation contexts. Output covers five categories: routine care, preventive measures, immediate treatment, dietary modifications, and oral hygiene education. Recommendations are confidence-ranked, so the highest-certainty advice surfaces first.

The full pipeline is served through a Flask application with a drag-and-drop upload interface, real-time detection visualization, and confidence score display.

**Stack:** Python · PyTorch · Mask R-CNN · ResNet-50 · BERT (fine-tuned) · Flask · OpenCV · scikit-learn

**Repo:** [github.com/rajeshkadiyalaaa/Dental-Caries-Detection](https://github.com/rajeshkadiyalaaa/Dental-Caries-Detection)

---

## PROJECT 3 — Adaptive Style Transfer (CycleGAN + AdaIN)

### Short Summary
An extended neural style transfer system that combines CycleGAN's unpaired image translation with Adaptive Instance Normalization for controllable, high-quality style application.

### The Full Write

Standard neural style transfer has a well-known limitation: it optimizes per image, making real-time or batch processing impractical. CycleGAN improves on this by learning a mapping between style domains — but its stylization tends to be domain-locked, not adaptive.

This project integrates AdaIN (Adaptive Instance Normalization) into the CycleGAN architecture. The idea is to enable style intensity control without retraining — you can dial the degree of stylization at inference time rather than committing to it during training. The generator learns to separate content features from style statistics, and AdaIN layers modulate the normalization based on target style embeddings.

The practical outcome is a more flexible system: the same trained model can produce subtle stylization or full artistic transformation, controlled by a single parameter. Useful for any application where stylization strength needs to vary per user or context.

**Stack:** Python · PyTorch · CycleGAN · AdaIN · OpenCV

**Repo:** [github.com/rajeshkadiyalaaa/Adaptive-Style-Transfer-in-CycleGAN-with-AdaIN-Integration](https://github.com/rajeshkadiyalaaa/Adaptive-Style-Transfer-in-CycleGAN-with-AdaIN-Integration)

---

## PROJECT 4 — MCQ Generator (NLP + ML)

### Short Summary
An NLP-based system that automatically generates multiple-choice questions from raw PDF or text documents — useful for education, training platforms, and content assessment tooling.

### The Full Write

Writing good assessment questions is time-consuming. For educators, content creators, or anyone building training materials at scale, manual question creation doesn't scale. This tool automates the process.

The system takes a PDF or plain text document, extracts key concepts and factual statements, and generates multiple-choice questions with plausible distractors. The pipeline uses NLP techniques for sentence importance ranking, keyword extraction, and distractor generation — ensuring questions test genuine comprehension rather than surface pattern-matching.

The practical output is a set of questions that could slot directly into a quiz system, LMS, or study tool. This was built with education technology use cases in mind, where generating assessment content from existing course materials could save significant instructor time.

**Stack:** Python · Jupyter Notebook · NLP (spaCy / NLTK) · PDF parsing · scikit-learn

**Repo:** [github.com/rajeshkadiyalaaa/MCQS-Generator-Using-Machine-learning-NLP](https://github.com/rajeshkadiyalaaa/MCQS-Generator-Using-Machine-learning-NLP)

---

---

# SECTION 5: SKILLS

---

## Skills — Organized Strategically

### AI / Machine Learning
Computer Vision · Natural Language Processing · Deep Learning · Transfer Learning · Model Fine-tuning · CNNs · Transformers · PyTorch · TensorFlow · scikit-learn · Mask R-CNN · ResNet · BERT · CycleGAN

### Full-Stack Engineering
React 18 · TypeScript · JavaScript · Python · Flask · Node.js · Vite · Tailwind CSS · HTML/CSS · REST APIs · Electron

### Data & Backend
PostgreSQL · Supabase · SQL · Pandas · NumPy · Jupyter · Data visualization · ETL pipelines

### Tooling & Infrastructure
Git · GitHub · Vercel · ESLint · Vite build tooling · Environment configuration · Supabase RLS & Auth · CSV/bulk data processing

### Product & Design
UI/UX design principles · Component architecture · Information architecture · Design systems · Figma · User-centered product thinking · Visual design

### Currently Exploring
Go · Advanced model optimization · React Native · LLM application architecture

---

---

# SECTION 6: CONTACT

---

## Contact Section Write

If you're building something at the intersection of AI and real product engineering, I'd like to hear about it.

I'm open to full-time roles, contract work, and technical collaborations. I respond quickly.

**Email:** rajeshkadiyalaaa@gmail.com
**GitHub:** github.com/rajeshkadiyalaaa
**LinkedIn:** linkedin.com/in/rajesh-kadiyala
**Location:** Vijayawada, India (open to remote)

`Send a Message →`

---

### Alternative CTA (warmer tone):

I'm at the stage of my career where the right opportunity matters more than the biggest one. If you're working on something technically interesting and need someone who can go deep on both the model and the product — let's talk.

---

---

# RECRUITER OPTIMIZATION NOTES

---

## For ATS & Quick Scanning

**Keywords to naturally include in your portfolio:**
`machine learning` · `computer vision` · `NLP` · `React` · `TypeScript` · `full-stack` · `Python` · `deep learning` · `production` · `Supabase` · `PostgreSQL` · `Electron` · `Flask` · `PyTorch` · `TensorFlow`

**Title options to use on LinkedIn / resume header:**
- AI/ML Engineer & Full-Stack Developer
- Full-Stack AI Engineer
- Machine Learning Engineer | Product Builder
- AI Engineer (Computer Vision & NLP)

---

## Structural Recommendations

1. **Project order on the portfolio:** Le Frut POS → Dental Caries → Style Transfer → MCQ Generator. Lead with the most technically complex + most production-real.

2. **Hero section must answer in 3 seconds:** Who are you? What do you build? Where can I see it? Current hero answers "who" but not "what." Fix the subheadline.

3. **Every project needs a direct GitHub link** visible without clicking into the project. Put it on the card.

4. **Add one number to each project card.** Even: "3 models · 681 training images" or "6 core modules · deployed as .exe." Numbers signal real work.

5. **Remove the Education timeline showing secondary and junior college.** Replace with just: B.Tech, AI & ML, Usha Rama College — 2021–2025.

6. **The contact form is good. Add your email address visibly** — don't make recruiters submit a form to get it.

---

## Emotional Perception Goals

The portfolio should leave a recruiter thinking:
> *"This person builds real things. The POS system is genuinely impressive for someone at this stage. The dental AI pipeline shows they understand ML properly, not just surface-level. They can talk to both engineering managers and product teams. I want to see their code."*

Not:
> *"Beautiful portfolio. Not sure what they actually do."*

The aesthetic is already working. Now the content needs to match it.

---

---

# STRONGEST ALTERNATIVE PHRASINGS

---

## Hero Alt — If you want to be more direct about the AI+product angle:

> **I train models. I ship products. Sometimes both in the same project.**
> 
> AI/ML engineer with full-stack delivery. Computer vision, NLP, and production web applications from Vijayawada, India.

---

## About Alt — Opening paragraph only:

> I got into machine learning because I wanted to build things that were actually hard to build. Not because I wanted to optimize a validation metric — because I wanted to solve a problem that required real thinking about architecture, data, and what it means for a system to actually work.

---

## Le Frut POS Alt — One-liner for card view:

> A full-featured desktop POS system built for a real business: inventory, transactions, thermal printing, live analytics, and a distributable `.exe` — all from scratch.

---

## Dental AI Alt — One-liner for card view:

> Three-model deep learning pipeline for dental X-ray analysis: cavity detection (Mask R-CNN), severity classification (ResNet-50), and personalized clinical recommendations (fine-tuned BERT).

---

*Portfolio content written based on: GitHub repositories (lefrut-pos, Dental-Caries-Detection, Adaptive-Style-Transfer-in-CycleGAN-with-AdaIN-Integration, MCQS-Generator-Using-Machine-learning-NLP), portfolio site, LinkedIn profile, resume summary.*

*Version: May 2026*
