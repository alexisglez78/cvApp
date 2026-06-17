from PIL import Image, ImageDraw, ImageFont
import os

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def make_gradient(size, c1, c2):
    img = Image.new('RGBA', (size, size))
    draw = ImageDraw.Draw(img)
    for y in range(size):
        ratio = y / max(size - 1, 1)
        r = int(c1[0] + (c2[0] - c1[0]) * ratio)
        g = int(c1[1] + (c2[1] - c1[1]) * ratio)
        b = int(c1[2] + (c2[2] - c1[2]) * ratio)
        draw.line([(0, y), (size - 1, y)], fill=(r, g, b, 255))
    return img

def load_font(size):
    size = max(size, 8)
    font_paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in font_paths:
        try:
            return ImageFont.truetype(path, size)
        except:
            pass
    # Pillow 10+ load_default acepta size
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()

def create_icon(size, round_mask=False):
    c1 = hex_to_rgb('6C5CE7')   # púrpura (tema app)
    c2 = hex_to_rgb('FF6B8A')   # rosa accent (tema app)

    img = make_gradient(size, c1, c2)
    draw = ImageDraw.Draw(img)

    # --- Símbolo "</>" central ---
    text = "</>"
    font_size = int(size * 0.36)
    font = load_font(font_size)

    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) // 2 - bbox[0]
    y = (size - th) // 2 - bbox[1] - int(size * 0.06)

    # Sombra suave
    so = max(1, size // 48)
    draw.text((x + so, y + so), text, fill=(30, 0, 80, 120), font=font)
    # Texto blanco
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

    # --- Iniciales "PAGC" debajo ---
    init = "PAGC"
    i_font_size = int(size * 0.14)
    i_font = load_font(i_font_size)

    ibbox = draw.textbbox((0, 0), init, font=i_font)
    ix = (size - (ibbox[2] - ibbox[0])) // 2 - ibbox[0]
    iy = int(size * 0.70) - ibbox[1]
    draw.text((ix, iy), init, fill=(255, 255, 255, 200), font=i_font)

    # --- Máscara circular (solo para ic_launcher_round) ---
    if round_mask:
        mask = Image.new('L', (size, size), 0)
        mdraw = ImageDraw.Draw(mask)
        mdraw.ellipse([(0, 0), (size - 1, size - 1)], fill=255)
        img.putalpha(mask)
        return img

    # Convertir a RGB para iconos normales (iOS no admite alpha en iconos)
    result = Image.new('RGB', (size, size), (0, 0, 0))
    result.paste(img, mask=img.split()[3])
    return result

# ─── iOS ────────────────────────────────────────────────────────────────────
ios_dir = 'ios/cvApp/Images.xcassets/AppIcon.appiconset'

ios_files = {
    'icon-40.png':   40,
    'icon-60.png':   60,
    'icon-58.png':   58,
    'icon-87.png':   87,
    'icon-80.png':   80,
    'icon-120.png':  120,
    'icon-180.png':  180,
    'icon-1024.png': 1024,
}

for fname, sz in ios_files.items():
    create_icon(sz).save(os.path.join(ios_dir, fname))
    print(f"  iOS {fname}")

# Actualizar Contents.json
contents = '''{
  "images" : [
    { "filename" : "icon-40.png",   "idiom" : "iphone", "scale" : "2x", "size" : "20x20" },
    { "filename" : "icon-60.png",   "idiom" : "iphone", "scale" : "3x", "size" : "20x20" },
    { "filename" : "icon-58.png",   "idiom" : "iphone", "scale" : "2x", "size" : "29x29" },
    { "filename" : "icon-87.png",   "idiom" : "iphone", "scale" : "3x", "size" : "29x29" },
    { "filename" : "icon-80.png",   "idiom" : "iphone", "scale" : "2x", "size" : "40x40" },
    { "filename" : "icon-120.png",  "idiom" : "iphone", "scale" : "3x", "size" : "40x40" },
    { "filename" : "icon-120.png",  "idiom" : "iphone", "scale" : "2x", "size" : "60x60" },
    { "filename" : "icon-180.png",  "idiom" : "iphone", "scale" : "3x", "size" : "60x60" },
    { "filename" : "icon-1024.png", "idiom" : "ios-marketing", "scale" : "1x", "size" : "1024x1024" }
  ],
  "info" : { "author" : "xcode", "version" : 1 }
}
'''
with open(os.path.join(ios_dir, 'Contents.json'), 'w') as f:
    f.write(contents)
print("  iOS Contents.json actualizado")

# ─── Android ────────────────────────────────────────────────────────────────
android_sizes = [
    ('mipmap-mdpi',    48),
    ('mipmap-hdpi',    72),
    ('mipmap-xhdpi',   96),
    ('mipmap-xxhdpi',  144),
    ('mipmap-xxxhdpi', 192),
]

for folder, sz in android_sizes:
    base = f'android/app/src/main/res/{folder}'
    create_icon(sz).save(f'{base}/ic_launcher.png')
    create_icon(sz, round_mask=True).save(f'{base}/ic_launcher_round.png')
    print(f"  Android {folder}")

print("\n✅ Iconos generados correctamente.")
