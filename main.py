import os

# Extensions to replace
targets = ['png', 'jpg', 'jpeg', 'ico']
replacement = 'avif'

# Directory to process
directory = 'src/components'

# Traverse directory
for root, _, files in os.walk(directory):
    for file in files:
        file_path = os.path.join(root, file)

        # Only process text-like files
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Skipping {file_path} (not a text file): {e}")
            continue

        # Replace target extensions
        original_content = content
        for ext in targets:
            content = content.replace(f'.{ext}', '.avif')
            content = content.replace(f'"{ext}"', '"avif"')
            content = content.replace(f"'{ext}'", "'avif'")

        # Only rewrite if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
