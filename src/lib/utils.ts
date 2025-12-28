import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApostas() {
  const divs = document.querySelectorAll("div.numeros-volante")
  const apostas = Array.from(divs).map((div) =>
    Array.from(div.querySelectorAll("span")).map((span) => span.textContent?.trim())
  ).map((aposta) => aposta.join(" "));

  console.log(apostas.join("\n"))
}

export async function getResult(concurso: string) {
  const res = await fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${concurso}`)
  console.log(res)
  if (res.status === 200) {
    const json = await res.json()
    return json
  }
}
