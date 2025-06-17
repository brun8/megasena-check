"use client"

import { ResultGroup } from "@/components/result-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

export default function Home() {
  const [results, setResults] = useState<CollisionCounterGroup>()
  const [value, setValue] = useState("")

  const buttonDisabled = value.length !== 12

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
            maxLength={17}
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


        {results &&
          <div className="space-y-4">
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
06 09 19 24 30 34 43 57
13 16 36 41 42 44 58
01 14 17 30 44 60
03 18 35 36 42 50
05 13 29 31 46 50
07 08 23 29 36 48
08 09 21 36 49 50
12 14 18 32 43 50
12 20 24 28 42 58
13 15 34 42 59 60
30 46 48 50 56 58
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

