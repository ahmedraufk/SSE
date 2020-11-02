
import json
import csv

def main():
  f = open('voting_polls.json')
  data = json.load(f)

  csv_headers = ["id", "name", "address", "precincts", "phone", "status", "lat", "lon"]
  id = 0
  result = []
  row = []
  memory = {}

  for obj in data["features"]:
    address = obj["properties"]["Address"].replace('.', '').strip()
    location = obj["properties"]["Location"].strip()
    precinct = obj["properties"]["Precinct"]
    status = obj["properties"]["status"]
    lat = obj["geometry"]["coordinates"][1]
    lon = obj["geometry"]["coordinates"][0]

    if location in memory.keys():
      result[memory[location]][3] = result[memory[location]][3] + "," + precinct
    else:
      memory[location] = id
      row.append(id+1)
      row.append(location)
      row.append(address)
      row.append(precinct)
      row.append(getNum(address))
      if status == "approved":
        row.append("1")
      else:
        row.append("0")
      row.append(lat)
      row.append(lon)
      result.append(row)
      row = []
      id += 1

  filename = "new_data.csv"
  with open(filename, 'w') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(csv_headers)
    csvwriter.writerows(result)

def getNum(address):
    with open('rich_locations.csv', mode='r') as file:
        csvFile = csv.reader(file)
        seen_addresses = set()
        for line in csvFile:
            phone = line[3][0:12].strip()
            new_address = line[2].strip().replace('.', '')
            if address == new_address and len(phone) > 0 and new_address not in seen_addresses:
                seen_addresses.add(new_address)
                phone_parts = phone.split('-')
                new_phone = "+1"
                for part in phone_parts:
                    new_phone += part
                return new_phone



if __name__ == "__main__":
  main()