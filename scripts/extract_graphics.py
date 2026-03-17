import fitz # PyMuPDF
import os

pdf_files = [
    "Private Credit - Fact vs. Fiction.pdf",
    "Apollo Retirement Services Business Update 2025.pdf",
    "Apollo Investor Presentation – February 2026.pdf"
]

sources_dir = "sources"
output_dir = "public/assets/graphics"

os.makedirs(output_dir, exist_ok=True)

for pdf_name in pdf_files:
    pdf_path = os.path.join(sources_dir, pdf_name)
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        continue
        
    print(f"Processing: {pdf_name}")
    pdf_document = fitz.open(pdf_path)
    
    # Prefix output images to avoid name clashes
    prefix = pdf_name.split('.')[0].replace(' ', '_').replace('-', '').replace('__', '_').lower()
    
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        image_list = page.get_images()
        
        for image_index, img in enumerate(image_list, start=1):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Simple heuristic: ignore very small images (like tiny logos/bullets)
            if len(image_bytes) < 10000:
                continue
                
            image_name = f"{prefix}_p{page_num+1}_i{image_index}.{image_ext}"
            image_path = os.path.join(output_dir, image_name)
            
            with open(image_path, "wb") as f:
                f.write(image_bytes)
            print(f"Extracted: {image_name}")

print("Done extracting graphics.")
