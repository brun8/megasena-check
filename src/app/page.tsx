"use client"

import { ResultGroup } from "@/components/result-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

export default function Home() {
  const [results, setResults] = useState<CollisionCounterGroup>()
  const [value, setValue] = useState("")

  // const buttonDisabled = value.length !== 12
  const buttonDisabled = false

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formattedValue = formatWithSpaces(value)
    const valueArr = formattedValue.split(" ")

    setResults(groupCollisions(valueArr))
  }

  if (results) {
    console.log(results)
  }

  return (
    <main className="mx-auto w-[90%] max-w-xl mt-10 md:mt-24 flex flex-col">
      <div
        className="space-y-5"
      >
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <h1
            className="text-xl font-bold"
          >
            resultado
          </h1>
          <Input
            placeholder="Ex: 01 02 03 04 05 06"
            value={formatWithSpaces(value)}
            maxLength={44}
            onChange={(event) => {
              console.log(value)
              const digits = getDigits(event.target.value)
              setValue(digits.trim())
            }}
          />

          <p className="text-zinc-600">
            se o número for menor que 10, colocar o 0 na frente
          </p>
          <Button
            type="submit"
            size="lg"
            className="font-semibold mx-auto"
            disabled={buttonDisabled}
          >
            enviar
          </Button>
        </form>

        {/* lotofacil da independencia */}
        {results &&
          <div className="space-y-4">
            <h1 className="font-bold text-xl">acertos</h1>
            {results[15] &&
              <ResultGroup label="15" results={results[15]} />
            }
            {results[14] &&
              <ResultGroup label="14" results={results[14]} />
            }
            {results[13] &&
              <ResultGroup label="13" results={results[13]} />
            }
          </div>
        }

        {results &&
          <div className="space-y-4 hidden">
            <h1 className="font-bold text-xl">acertos</h1>
            {results[6] &&
              <ResultGroup label="sena" results={results[6]} />
            }
            {results[5] &&
              <ResultGroup label="quina" results={results[5]} />
            }
            {results[4] &&
              <ResultGroup label="quadra" results={results[4]} />
            }
            {(!results[4] && !results[5] && !results[6]) &&
              <p>nada</p>
            }
          </div>
        }

        <hr className="border-1 rounded-md" />

        <div className="space-y-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="font-bold hover:no-underline">
                jogos:
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {jogosArr.map((jogo, idx) => (
                    <p key={idx}>
                      {jogo.join(" ")}
                    </p>
                  ))
                  }
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main >
  );
}

const jogos = `
01 02 04 05 07 10 12 13 14 16 17 18 20 21 22 25
01 02 04 07 08 09 11 12 13 14 16 17 18 19 21 25
01 03 05 06 07 08 11 15 16 17 18 20 21 22 23 24
01 07 08 09 10 11 12 13 14 16 17 18 19 21 22 24
02 05 07 08 09 10 12 13 14 15 16 18 21 22 24 25
03 04 05 06 07 10 11 13 16 18 19 20 21 22 23 25
03 05 07 09 11 12 13 14 15 18 20 21 22 23 24 25
01 02 03 04 05 06 07 09 10 11 18 19 22 23 24
01 02 03 04 05 06 08 09 13 15 18 21 23 24 25
01 02 03 04 05 08 09 10 12 15 16 17 18 21 22
01 02 03 04 05 08 09 10 14 16 17 19 20 21 23
01 02 03 04 06 07 12 13 14 17 20 22 23 24 25
01 02 03 06 07 12 14 15 16 18 19 21 23 24 25
01 02 04 05 06 08 10 11 12 13 16 18 21 23 25
01 02 04 05 06 09 10 15 16 18 19 20 21 22 25
01 02 04 05 06 10 14 15 16 18 19 20 21 23 24
01 02 04 05 07 10 13 15 18 19 20 21 22 23 24
01 02 04 07 08 10 11 12 13 16 17 21 22 24 25
01 02 05 06 07 09 10 12 18 19 21 22 23 24 25
01 03 04 05 07 08 09 10 11 13 15 17 21 22 23
01 03 05 06 10 12 14 16 17 18 20 22 23 24 25
01 03 07 08 09 10 11 14 16 17 18 20 21 24 25
01 03 08 09 10 12 13 15 18 19 20 22 23 24 25
01 04 05 06 07 08 09 15 16 17 19 20 21 23 24
01 04 06 08 09 10 11 15 17 18 19 21 22 24 25
02 03 04 05 06 07 08 09 10 13 15 17 19 21 22
02 03 04 05 06 07 08 10 11 12 15 16 20 22 25
02 03 05 06 07 08 10 13 14 15 18 20 21 22 25
02 04 05 06 08 10 11 13 14 17 21 22 23 24 25
02 04 05 10 12 13 14 16 18 19 20 21 22 23 24
02 05 06 07 09 11 12 13 14 17 20 21 22 24 25
02 05 06 10 11 14 15 17 18 19 20 21 22 23 25
03 04 05 06 07 08 10 11 13 16 18 19 21 24 25
03 04 07 09 10 11 12 13 15 17 18 20 21 23 25
03 06 07 08 09 10 13 14 15 20 21 22 23 24 25
03 06 07 08 09 11 12 13 15 16 20 21 22 23 25
04 05 06 07 08 10 12 14 17 18 20 21 22 23 24
`;

const jogosArr = jogos.split("\n").map((elem) => elem.trim().split(" ")).filter((l) => l.length >= 6)

// function convertToNums(str: string) {
//   return str.trim().split(" ").map(Number)
// }

function countCollisions(a: string[], b: string[]) {
  let count = 0
  a.forEach((num) => {
    if (b.indexOf(num) !== -1) {
      count += 1
    }
  })
  return count
}

type CollisionCounterGroup = Record<number, string[][]>

function groupCollisions(gameResult: string[]) {
  const res = jogosArr.reduce((acc, cur) => {
    const count = countCollisions(cur, gameResult);
    if (!acc[count]) {
      acc[count] = [];
    }
    acc[count].push(cur);

    return acc;
  }, {} as CollisionCounterGroup)

  return res
}

function getDigits(value: string) {
  return value.replace(/\D/g, '')
}

function formatWithSpaces(value: string) {
  return value.replace(/(\d{2})/g, '$1 ').trim();
}

