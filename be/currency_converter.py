import http.client
import os
import json
from dotenv import load_dotenv

# Load Currency Freaks API key
load_dotenv()
CURRENCY_FREAKS_API_KEY = os.getenv("CURRENCY_FREAKS_API_KEY")
API_KEY = CURRENCY_FREAKS_API_KEY

conn = http.client.HTTPSConnection("api.currencyfreaks.com")
payload = ''
headers = {}

conn.request("GET", f"/v2.0/rates/latest?apikey={API_KEY}", payload, headers)
res = conn.getresponse()
data = res.read()
# Parse the JSON response
response_json = json.loads(data.decode("utf-8"))

def convert_usd_to_cad():
    return response_json["rates"]["CAD"]

def convert_usd_to_yuan():
    return response_json["rates"]["CNY"]

def convert_usd_to_euro():
    return response_json["rates"]["EUR"]

def convert_usd_to_yen():
    return response_json["rates"]["JPY"]


if __name__ == "__main__":
    # Example usage
    print("1 USD = " + convert_usd_to_cad() + " CAD")
    print("1 USD = " + convert_usd_to_yuan() + " CNY")
    print("1 USD = " + convert_usd_to_euro() + " EUR")
    print("1 USD = " + convert_usd_to_yen() + " JPY")
