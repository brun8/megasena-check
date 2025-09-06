import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 0800 1040104
export function getApostas() {
  const divs = document.querySelectorAll("div.numeros-volante")
  const apostas = Array.from(divs).map((div) =>
    Array.from(div.querySelectorAll("span")).map((span) => span.textContent?.trim())
  ).map((aposta) => aposta.join(" "));

  console.log(apostas.join("\n"))
}
