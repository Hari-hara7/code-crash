import { prisma } from "../lib/prisma"

async function main() {
  // Seed a dummy user
  await prisma.user.create({
    data: {
      name: "Student One",
      email: "student1@example.com",
      password: "123456" // plaintext for dev only
    }
  })

  // Seed sample questions
  await prisma.question.createMany({
    data: [
      {
        title: "Sum of Two Numbers",
        language: "cpp",
        correctCode: `
#include<iostream>
using namespace std;
int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b;
  return 0;
}
        `.trim()
      },
      {
        title: "Factorial of Number",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt(), f = 1;
    for(int i = 1; i <= n; i++) f *= i;
    System.out.print(f);
  }
}
        `.trim()
      }
    ]
  })

  console.log("✅ Seeded User and Questions")
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
