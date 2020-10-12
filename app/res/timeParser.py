import re
import sys

def timeParser(time):
  result = None
  time = time.lower()

  if len(time) < 1:
    return None

  #checks for time entered in pure numerical format like 20,35
  pure_numerical = re.compile(r'\d+$')

  #checks for time entered in minutes like 2 minutes, 23 minutes
  in_minutes = re.compile(r'(\d+)\s*((?:m|min|mins|minutes))$')

  #checks for time entered in hours like 2 hours, 2.5 hours,3 hours
  in_hours = re.compile(r'(\d+(\.\d+)?)\s*((?:h|hr|hrs|hour|hours))$')

  #checks for time entered in plain float like 2.5,3.25
  pure_float = re.compile(r'\d*\.\d+$') #assumed that float entered is in hours

  #checks for time entered in HH:MM format like 2:20
  with_colon = re.compile(r'(1[0-2]|0?[1-9]):([0-5]?[0-9])$')

  #checks for time entered in HH:MM hours format like 2:20 hours
  with_colon_hours = re.compile(r'(1[0-2]|0?[1-9]):([0-5]?[0-9])\s*(?:h|hr|hour|hours)$')

  #checks for time entered in x hours y minutes format like 2 hours 20 minutes
  hh_mm = re.compile(r'((\d+(\.\d+)?)\s*(h|hr|hrs?|hours?))?(\s*(\d+)\s*(m|min|mins?|minutes?))?$')

  #checks for time entered in x hours and y minutes format like 2 hours and 20 minutes
  hh_mm_and = re.compile(r'((\d+(\.\d+)?)\s*(h|hr|hrs?|hours?))?(\s*(?:and)\s*(\d+)\s*(m|min|mins?|minutes?))?$')

  try:
    if (pure_numerical.match(time)):
      res = pure_numerical.match(time).group()
      result = int(res)
    elif (in_minutes.match(time)):
      res = in_minutes.match(time).group(1)
      result = int(res)
    elif (in_hours.match(time)):
      res = in_hours.match(time).group(1)
      result = int(float(res) * 60)
    elif (pure_float.match(time)):
      res = pure_float.match(time).group()
      result = int(float(res) * 60)
    elif (with_colon.match(time)):
      res1 = with_colon.match(time).group(1)
      res2 = with_colon.match(time).group(2)
      result = int(res1)*60+int(res2)
    elif (with_colon_hours.match(time)):
      res1 = with_colon_hours.match(time).group(1)
      res2 = with_colon_hours.match(time).group(2)
      result = int(res1)*60+int(res2)
    elif (hh_mm.match(time)):
      res1 = hh_mm.match(time).group(2)
      res2 = hh_mm.match(time).group(6)
      result = int(res1)*60+int(res2)
    elif (hh_mm_and.match(time)):
      res1 = hh_mm_and.match(time).group(2)
      res2 = hh_mm_and.match(time).group(6)
      result = int(res1)*60+int(res2)
    #If none of the pattern matches then return false
    else:
      return None
  except ValueError:
    return None

  return result

print(timeParser(sys.argv[1]))
