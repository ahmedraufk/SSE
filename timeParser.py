import re
def timeParser(input):
  result = 0
  input = input.lower()

  #checks for time entered in pure numerical format like 20,35
  d=re.compile(r'\d+$')

  #checks for time entered in minutes like 2 minutes, 23 minutes
  e=re.compile(r'(\d+)\s*((?:m|min|mins|minutes))$')

  #checks for time entered in hours like 2 hours, 2.5 hours,3 hours
  h=re.compile(r'(\d+(\.\d+)?)\s*((?:h|hr|hrs|hour|hours))$')

  #checks for time entered in plain float like 2.5,3.25
  f=re.compile(r'\d*\.\d+$') #assumed that float entered is in hours

  #checks for time entered in HH:MM format like 2:20
  s=re.compile(r'(1[0-2]|0?[1-9]):([0-5]?[0-9])$')

  #checks for time entered in HH:MM hours format like 2:20 hours
  t=re.compile(r'(1[0-2]|0?[1-9]):([0-5]?[0-9])\s*(?:h|hr|hour|hours)$')

  #checks for time entered in x hours y minutes format like 2 hours 20 minutes
  u =re.compile(r'((\d+(\.\d+)?)\s*(h|hr|hrs?|hours?))?(\s*(\d+)\s*(m|min|mins?|minutes?))?$') 

  #checks for time entered in x hours and y minutes format like 2 hours and 20 minutes
  v = re.compile(r'((\d+(\.\d+)?)\s*(h|hr|hrs?|hours?))?(\s*(?:and)\s*(\d+)\s*(m|min|mins?|minutes?))?$')


  if (d.match(input) is not None):
    try:
      res = d.match(input).group()
      result = int(res)
    except ValueError:
      return False
  elif (e.match(input)is not None):
    try:
      res = e.match(input).group(1)
      result = int(res)
    except ValueError:
      return False
  elif (h.match(input) is not None):
    try:
      res = h.match(input).group(1)
      result = int(float(res) * 60)
    except ValueError:
      return False
  elif (f.match(input) is not None):
    try:
      res = f.match(input).group()
      result = int(float(res) * 60)
    except ValueError:
      return False
  elif (s.match(input) is not None):
    try:
      res1 = s.match(input).group(1)
      res2 = s.match(input).group(2)
      result = int(res1)*60+int(res2)
    except ValueError:
      return False
  elif (t.match(input) is not None):
    try:
      res1 = t.match(input).group(1)
      res2 = t.match(input).group(2)
      result = int(res1)*60+int(res2)
    except ValueError:
      return False
  elif (u.match(input) is not None):
    try:
      res1 = u.match(input).group(2)
      res2 = u.match(input).group(6)
      result = int(res1)*60+int(res2)
    except ValueError:
      return False
  elif (v.match(input) is not None):
    try:
      res1 = v.match(input).group(2)
      res2 = v.match(input).group(6)
      result = int(res1)*60+int(res2)
    except ValueError:
      return False
  #If none of the pattern matches then return false
  else:
    return False
  #result is in minutes
  return result
