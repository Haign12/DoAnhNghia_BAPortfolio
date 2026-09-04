from pathlib import Path

path = Path('styles.css')
text = path.read_text(encoding='utf-8')
old = '''.hero-orbit-b {
  width: 245px;
  height: 520px;
  right: 4%;
  top: 10%;
  transform: rotate(24deg);
}'''
new = '''.hero-orbit-b {
  width: 232px;
  height: 496px;
  right: 12%;
  top: 11%;
  transform: rotate(24deg);
}'''
if old not in text:
    raise SystemExit('Expected hero-orbit-b owner block not found')
path.write_text(text.replace(old, new, 1), encoding='utf-8')
print('Adjusted hero orbit geometry without changing the composition model.')
