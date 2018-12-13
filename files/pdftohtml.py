f = open("tutorial_groups.html", "r")

for line in f:
    if 'src' in line:
        print(line)
