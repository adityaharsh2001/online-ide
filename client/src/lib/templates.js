const template = {};

template.cpp = `#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World!";
    // Code here
    return 0;
}`;

template.py = `print('Hello, world!')`;
template.java = `class main {  
  public static void main(String args[]){  
   System.out.println("Hello Java");  
  }  
}  `;
export default template;
