import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Expand tailwind.config
tailwind_script = '''<script>
    tailwind.config = {
      corePlugins: {
        preflight: false,
      },
      theme: {
        extend: {
          colors: {
            brand: {
              50: 'var(--color-brand-50)',
              100: 'var(--color-brand-100)',
              200: 'var(--color-brand-200)',
              300: 'var(--color-brand-300)',
              400: 'var(--color-brand-400)',
              500: 'var(--color-brand-500)',
              600: 'var(--color-brand-600)',
              800: 'var(--color-brand-800)',
              950: 'var(--color-brand-950)',
            },
            success: {
              50: 'var(--color-success-50)',
              100: 'var(--color-success-100)',
              300: 'var(--color-success-300)',
              500: 'var(--color-success-500)',
              600: 'var(--color-success-600)',
              700: 'var(--color-success-700)',
              800: 'var(--color-success-800)',
            },
            warning: {
              50: 'var(--color-warning-50)',
              400: 'var(--color-warning-400)',
              500: 'var(--color-warning-500)',
              600: 'var(--color-warning-600)',
              700: 'var(--color-warning-700)',
            }
          },
          fontSize: {
            'theme-xs': ['var(--text-theme-xs)', 'var(--text-theme-xs--line-height)'],
            'theme-sm': ['var(--text-theme-sm)', 'var(--text-theme-sm--line-height)'],
            'theme-xl': ['var(--text-theme-xl)', 'var(--text-theme-xl--line-height)'],
          },
          boxShadow: {
            'theme-xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            'theme-sm': '0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)'
          }
        }
      }
    }
  </script>'''

content = re.sub(r'<script>\s*tailwind\.config = \{[\s\S]*?\}\s*</script>', tailwind_script, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated tailwind.config in index.html")
