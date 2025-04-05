import { prisma } from "../lib/prisma";

async function main() {
  // Dummy user
  await prisma.user.create({
    data: {
      name: "Student One",
      email: "student1@example.com",
      password: "123456"
    }
  });

  // 30 Java Questions
  await prisma.question.createMany({
    data: [
      {
        title: "Sum of Two Numbers",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt(), b = sc.nextInt();
    System.out.println(a + b);
  }
}`.trim()
      },
      {
        title: "Factorial of a Number",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt(), f = 1;
    for(int i = 1; i <= n; i++) f *= i;
    System.out.println(f);
  }
}`.trim()
      },
      {
        title: "Check Prime Number",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    boolean prime = n > 1;
    for(int i = 2; i <= Math.sqrt(n); i++)
      if(n % i == 0) { prime = false; break; }
    System.out.println(prime ? "Yes" : "No");
  }
}`.trim()
      },
      {
        title: "Reverse a String",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    String s = new Scanner(System.in).nextLine();
    System.out.println(new StringBuilder(s).reverse());
  }
}`.trim()
      },
      {
        title: "Fibonacci Series",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt(), a = 0, b = 1;
    for(int i = 0; i < n; i++) {
      System.out.print(a + " ");
      int c = a + b;
      a = b;
      b = c;
    }
  }
}`.trim()
      },
      {
        title: "Palindrome Check",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    String s = new Scanner(System.in).nextLine();
    String rev = new StringBuilder(s).reverse().toString();
    System.out.println(s.equals(rev) ? "Yes" : "No");
  }
}`.trim()
      },
      {
        title: "Count Vowels",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    String s = new Scanner(System.in).nextLine().toLowerCase();
    int count = 0;
    for(char c : s.toCharArray()) if("aeiou".indexOf(c) != -1) count++;
    System.out.println(count);
  }
}`.trim()
      },
      {
        title: "GCD of Two Numbers",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int a = new Scanner(System.in).nextInt();
    int b = new Scanner(System.in).nextInt();
    while(b != 0) {
      int temp = b;
      b = a % b;
      a = temp;
    }
    System.out.println(a);
  }
}`.trim()
      },
      {
        title: "Swap Two Numbers",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int a = new Scanner(System.in).nextInt();
    int b = new Scanner(System.in).nextInt();
    a = a + b;
    b = a - b;
    a = a - b;
    System.out.println(a + " " + b);
  }
}`.trim()
      },
      {
        title: "Find Max of 3 Numbers",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int a = new Scanner(System.in).nextInt();
    int b = new Scanner(System.in).nextInt();
    int c = new Scanner(System.in).nextInt();
    System.out.println(Math.max(a, Math.max(b, c)));
  }
}`.trim()
      },
      {
        title: "Check Even or Odd",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    System.out.println(n % 2 == 0 ? "Even" : "Odd");
  }
}`.trim()
      },
      {
        title: "Area of Circle",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    double r = new Scanner(System.in).nextDouble();
    System.out.printf("%.2f", Math.PI * r * r);
  }
}`.trim()
      },
      {
        title: "Print Multiplication Table",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    for(int i = 1; i <= 10; i++) System.out.println(n + " x " + i + " = " + n*i);
  }
}`.trim()
      },
      {
        title: "Check Armstrong Number",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int num = new Scanner(System.in).nextInt();
    int sum = 0, temp = num;
    while(temp > 0) {
      int digit = temp % 10;
      sum += digit * digit * digit;
      temp /= 10;
    }
    System.out.println(sum == num ? "Yes" : "No");
  }
}`.trim()
      },
      {
        title: "Sum of Digits",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt(), sum = 0;
    while(n > 0) {
      sum += n % 10;
      n /= 10;
    }
    System.out.println(sum);
  }
}`.trim()
      },
      {
        title: "Check Leap Year",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int y = new Scanner(System.in).nextInt();
    System.out.println((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0) ? "Yes" : "No");
  }
}`.trim()
      },
      {
        title: "Char is Vowel or Consonant",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    char c = new Scanner(System.in).next().toLowerCase().charAt(0);
    System.out.println("aeiou".indexOf(c) != -1 ? "Vowel" : "Consonant");
  }
}`.trim()
      },
      {
        title: "Binary to Decimal",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    String b = new Scanner(System.in).next();
    System.out.println(Integer.parseInt(b, 2));
  }
}`.trim()
      },
      {
        title: "Decimal to Binary",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int d = new Scanner(System.in).nextInt();
    System.out.println(Integer.toBinaryString(d));
  }
}`.trim()
      },
      {
        title: "Check Positive/Negative",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    System.out.println(n > 0 ? "Positive" : n < 0 ? "Negative" : "Zero");
  }
}`.trim()
      },
      {
        title: "Print ASCII Value",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    char c = new Scanner(System.in).next().charAt(0);
    System.out.println((int)c);
  }
}`.trim()
      },
      {
        title: "Sum of N Natural Numbers",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    System.out.println(n * (n + 1) / 2);
  }
}`.trim()
      },
      {
        title: "Print Numbers 1 to N",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    for(int i = 1; i <= n; i++) System.out.print(i + " ");
  }
}`.trim()
      },
      {
        title: "Print Star Pattern",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    for(int i = 1; i <= n; i++) {
      for(int j = 1; j <= i; j++) System.out.print("*");
      System.out.println();
    }
  }
}`.trim()
      },
      {
        title: "Calculate Power (a^b)",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int a = new Scanner(System.in).nextInt();
    int b = new Scanner(System.in).nextInt();
    System.out.println((int)Math.pow(a, b));
  }
}`.trim()
      },
      {
        title: "Count Digits",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt(), count = 0;
    while(n != 0) {
      count++;
      n /= 10;
    }
    System.out.println(count);
  }
}`.trim()
      },
      {
        title: "Print Even Numbers up to N",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    for(int i = 2; i <= n; i += 2) System.out.print(i + " ");
  }
}`.trim()
      },
      {
        title: "Check Perfect Number",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt(), sum = 0;
    for(int i = 1; i < n; i++) if(n % i == 0) sum += i;
    System.out.println(sum == n ? "Yes" : "No");
  }
}`.trim()
      },
      {
        title: "Print Prime Numbers up to N",
        language: "java",
        correctCode: `
import java.util.*;
public class Main {
  static boolean isPrime(int n) {
    if(n <= 1) return false;
    for(int i = 2; i <= Math.sqrt(n); i++) if(n % i == 0) return false;
    return true;
  }
  public static void main(String[] args) {
    int n = new Scanner(System.in).nextInt();
    for(int i = 2; i <= n; i++) if(isPrime(i)) System.out.print(i + " ");
  }
}`.trim()
      }
    ]
  });

  console.log("✅ Seeded 30 Java Questions");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
