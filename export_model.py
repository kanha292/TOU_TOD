from PyPDF2 import PdfReader
import pandas as pd

def extract_tariff_data(pdf_path, output_csv):
    reader = PdfReader(pdf_path)
    data = []
    for page in reader.pages:
        text = page.extract_text()
        lines = text.split("\n")
        for line in lines:
            if "-" in line and "Rs" not in line:  # Adjust if necessary
                parts = line.split()
                if len(parts) >= 3:
                    date, time_block, tariff = parts[0], parts[1] + " " + parts[2], float(parts[-1])
                    data.append([date, time_block, tariff])
    df = pd.DataFrame(data, columns=["Date", "Time_Block", "Tariff"])
    df.to_csv(output_csv, index=False)

extract_tariff_data("P4DATA.pdf", "tariff_data.csv")
