import zipfile
import xml.etree.ElementTree as ET
import re
import json

def parse_docx(filename):
    z = zipfile.ZipFile(filename)
    tree = ET.fromstring(z.read('word/document.xml'))
    
    # Extract text from paragraphs
    paragraphs = []
    for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        text = ''.join([t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text])
        if text.strip():
            paragraphs.append(text.strip())
            
    full_text = '\n'.join(paragraphs)
    
    # Split by product section numbers 1. to 10.
    sections = re.split(r'\n(?=\d+\.\s+)', full_text)
    
    products_doc_data = {}
    
    for sec in sections:
        lines = [l.strip() for l in sec.split('\n') if l.strip()]
        if not lines:
            continue
            
        header_match = re.match(r'(\d+)\.\s+(.*?)(?:\(Corrected from ID:\s*(\d+)\))?$', lines[0])
        if not header_match:
            continue
            
        sec_num = int(header_match.group(1))
        title = header_match.group(2).strip()
        
        # Extract text paragraphs before specification table
        descs = []
        specs = {}
        
        in_table = False
        last_param = None
        
        for line in lines[1:]:
            if "Specification Parameter" in line or "Technical Detail" in line:
                in_table = True
                continue
            if "Advanced Injection Dynamics" in line or "Regulatory Adherence" in line:
                break
                
            if not in_table:
                # Clean reference numbers like 8, [8], 23, etc.
                cleaned = re.sub(r'\[?\d+\]?', '', line).strip()
                cleaned = re.sub(r'\s+', ' ', cleaned)
                if cleaned:
                    descs.append(cleaned)
            else:
                # We are in table section
                pass

        full_desc = " ".join(descs)
        # Clean stray reference numbers at sentence ends
        full_desc = re.sub(r'\s+\d+(?=\.|\,|$|\s)', '', full_desc)
        full_desc = re.sub(r'\s+', ' ', full_desc).strip()
        
        # Short description is the first sentence or two
        first_period = full_desc.find('.')
        if first_period != -1 and first_period < 150:
            short_desc = full_desc[:first_period+1]
        else:
            short_desc = full_desc[:140] + "..."

        products_doc_data[sec_num] = {
            'title': title,
            'long_description': full_desc,
            'short_description': short_desc
        }
        
    return products_doc_data

# Specific mappings from document to products.json IDs
ID_MAPPING = {
    1: 9001,
    2: 9002,
    3: 9003,
    4: 9004,
    5: 9005,
    6: 9006,
    7: 9007,
    8: 9008,
    9: 9009,
    10: 9010
}

PRODUCT_NAME_MAPPING = {
    9001: "IOVUE™ FLEXIOL AO / ASPROLENZ - Aspheric Hydrophilic Acrylic Foldable IOL",
    9002: "IOVUE™ AMH Series Hydrophobic Acrylic 3-Piece IOL",
    9003: "IOVUE™ Hyphovue Yellow Filter Aspheric IOL",
    9004: "IOVUE™ FA 6005 / YA 6005 Quad Haptic Hydrophilic Foldable IOL",
    9005: "IOVUE™ PROXYLENZ / GLOWEDGE Aspheric PMMA IOL",
    9006: "IOVUE™ Irisglow Iris-Claw Fixation PMMA IOL",
    9007: "IOVUE™ PS 6535 Scleral Fixation PMMA 3-Piece IOL",
    9008: "IOVUE™ ACCURAVUE Yellow Hydrophilic Aspheric 360 Edge IOL",
    9009: "IOVUE™ HEMAFOLD / GLOWFOLD Hydrophilic Acrylic Foldable IOL",
    9010: "IOVUE™ FLEXIOL PHOBIC Aspheric / HYPHOFLEX Hydrophobic Monofocal IOL"
}

def main():
    doc_data = parse_docx('IOVUE Lens Description Corrections.docx')
    
    with open('public_html/data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
        
    updated_count = 0
    for p in products:
        p_id = p.get('id')
        if p_id in PRODUCT_NAME_MAPPING:
            p['brand'] = 'IOVUE'
            p['name'] = PRODUCT_NAME_MAPPING[p_id]
            
            # Find doc info by reverse mapping
            sec_num = [k for k, v in ID_MAPPING.items() if v == p_id][0]
            info = doc_data.get(sec_num)
            if info:
                p['long_description'] = info['long_description']
                p['short_description'] = info['short_description']
                
                # Make sure specs retain quality standards ISO 13485 & CE Marked
                if 'specifications' in p:
                    p['specifications']['Quality Standard'] = 'ISO 13485 : 2016 / CE Mark Technical Dossiers'
                    p['specifications']['Manufacturer'] = 'Central India Export (HQ Zero Mile, Nagpur)'
                    if 'Manufacturing Origin' in p['specifications']:
                        del p['specifications']['Manufacturing Origin']
                updated_count += 1

    with open('public_html/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"Successfully updated {updated_count} IOVUE products in public_html/data/products.json")

if __name__ == '__main__':
    main()
