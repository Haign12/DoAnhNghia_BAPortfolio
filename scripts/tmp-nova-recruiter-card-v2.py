from pathlib import Path

index_path = Path('index.html')
css_path = Path('portfolio-product-upgrade.css')

index = index_path.read_text(encoding='utf-8')

old = '''    <article class="flagship-card reveal">
      <a class="flagship-media" href="case-study-nova.html" aria-label="Read Nova Product Design case study"><img src="thumbnail/nova.png" alt="Nova consumer finance product interface" loading="lazy" decoding="async"><span class="flagship-proof">10 users · 2 rounds · retested</span></a>
      <div class="flagship-copy"><div class="flagship-index"><span>02 / Consumer fintech</span><span>Independent concept</span></div><h3>Nova</h3><p class="flagship-thesis">Personal finance organized around a harder question than “what is my balance?” — what is actually safe to spend after known obligations and a protected buffer?</p><div class="flagship-evidence"><div><span>Decision</span><p>Bring future obligations into the primary money-decision surface without turning home into a spreadsheet.</p></div><div><span>Product proof</span><p>Two verified direct-user rounds: 10 real-user async self-report records, 40 atomic evidence signals, 4 evidence-driven product decisions and one shipped + retested iteration. Round 02 keeps all four findings open.</p></div></div><div class="flagship-senior-signals"><strong>Product-design proof</strong><span>Decision framing</span><span>Evidence governance</span><span>State + recovery</span><span>Iteration + retest</span></div><div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html">Read case ↗</a><a href="https://nova-gamma-eosin.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Nova" target="_blank" rel="noopener">Source ↗</a><a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-02" target="_blank" rel="noopener">Retest evidence ↗</a></div></div>
    </article>'''

new = '''    <article class="flagship-card reveal nova-evidence-card">
      <a class="flagship-media" href="case-study-nova.html" aria-label="Read Nova Product Design case study"><img src="thumbnail/nova.png" alt="Nova consumer finance product interface" loading="lazy" decoding="async"><span class="flagship-proof">REAL-USER LOOP · 2 ROUNDS</span></a>
      <div class="flagship-copy">
        <div class="flagship-index"><span>02 / Consumer fintech</span><span>Self-initiated · retested</span></div>
        <h3>Nova</h3>
        <p class="flagship-thesis">Personal finance organized around a harder question than “what is my balance?” — what is actually safe to spend after known obligations and a protected buffer?</p>

        <div class="nova-card-scoreboard" aria-label="Nova product design evidence summary">
          <div><strong>10</strong><span>real-user records</span></div>
          <div><strong>40</strong><span>atomic signals</span></div>
          <div><strong>4</strong><span>product decisions</span></div>
          <div><strong>2×</strong><span>research rounds</span></div>
        </div>

        <div class="nova-card-loop" aria-label="Nova product design loop">
          <span>Evidence</span><i>→</i><span>Decision</span><i>→</i><span>Ship</span><i>→</i><span>Retest</span>
        </div>

        <div class="flagship-evidence">
          <div><span>Decision</span><p>Move future obligations, transfer consequences and recovery truth into the exact moments where users make money decisions.</p></div>
          <div><span>What changed</span><p>Round 01 exposed four comprehension risks. I changed the prototype, shipped the iteration, then ran Round 02 with five new users. The retest still leaves all four findings open — visible, not hidden.</p></div>
        </div>

        <div class="flagship-senior-signals nova-proof-signals"><strong>Product-design evidence</strong><span>Research governance</span><span>Trade-offs</span><span>Failure + recovery</span><span>Iteration + retest</span></div>
        <div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html#nova-recruiter-proof">See 30-sec proof ↗</a><a href="https://ngh1aa.github.io/Nova/app.html?screen=home&lab=1" target="_blank" rel="noopener">Tested build ↗</a><a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-02" target="_blank" rel="noopener">Evidence ↗</a></div>
      </div>
    </article>'''

if old not in index:
    raise SystemExit('Nova flagship source block not found; refusing broad edit.')
index = index.replace(old, new, 1)
index_path.write_text(index, encoding='utf-8')

css = css_path.read_text(encoding='utf-8')
marker = '/* A31 Nova recruiter-visible evidence card */'
if marker not in css:
    css += '''\n\n/* A31 Nova recruiter-visible evidence card */\n.nova-evidence-card{border-color:#5a5a55;box-shadow:0 0 0 1px rgba(255,255,255,.02)}\n.nova-evidence-card .flagship-proof{background:#d7ff63;border-color:#d7ff63;font-weight:800}\n.nova-card-scoreboard{margin-top:24px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:#3c3c38;border:1px solid #3c3c38}\n.nova-card-scoreboard>div{min-width:0;padding:14px 12px;background:#101010}\n.nova-card-scoreboard strong{display:block;font-family:var(--display);font-size:clamp(28px,2.8vw,46px);font-weight:400;line-height:.9;color:#fff}\n.nova-card-scoreboard span{display:block;margin-top:8px;color:#9f9f99;font-size:8px;font-weight:700;letter-spacing:.1em;line-height:1.35;text-transform:uppercase}\n.nova-card-loop{margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:7px;padding:11px 12px;border:1px solid #3c3c38;background:#20201d;color:#fff}\n.nova-card-loop span{font-size:8px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;white-space:nowrap}\n.nova-card-loop i{font-style:normal;color:#d7ff63;font-size:12px}\n.nova-evidence-card .flagship-evidence{margin-top:18px}\n.nova-evidence-card .flagship-evidence span{color:#d7ff63}\n.nova-proof-signals strong{color:#d7ff63}\n.nova-proof-signals span{border-color:#56564e;background:#22221f}\n.nova-evidence-card .flagship-primary{background:#d7ff63;color:#111!important}\n@media(max-width:760px){.nova-card-scoreboard{grid-template-columns:repeat(2,minmax(0,1fr))}.nova-card-loop{flex-wrap:wrap;justify-content:flex-start}.nova-card-loop i{margin:0 1px}}\n'''
    css_path.write_text(css, encoding='utf-8')

print('Nova recruiter evidence card v2 applied.')
