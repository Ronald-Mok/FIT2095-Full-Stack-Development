def counter():
    counter = 0
    def count():
        counter+=1
        return counter


a = counter()
print(a)
print(a)

a = {"Hello": 123}

print(a[0])
