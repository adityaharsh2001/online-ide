# cook your dish here
T=int(input())
while(T>0):
    s=input()
    l=len(s)
    s1=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    s2=['1','2','3','4','5','6','7','8','9','0']
    count=0
    if s[0]!="<"or s[1]!="/" or s[l-1]!=">" or s=="</>":
        count+=1
    for i in range(2,l-1):
        if s[i] not in s1 and s[i] not in s2:
            count+=1 
    if count==0:
        print("Success")
    else:
         print("Error")
    T-=1
    
