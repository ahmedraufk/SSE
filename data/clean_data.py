
import json
import csv

def main():
  f = open('original_data.json')
  data = json.load(f)

  csv_headers = ["id", "name", "address", "precincts", "status", "lat", "lon"]
  id = 0
  result = []
  row = []
  memory = {}
  
  for obj in data["features"]:
    address = obj["properties"]["address"]
    location = obj["properties"]["location"]
    precinct = obj["properties"]["precinct"]
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

if __name__ == "__main__":
  main()