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
    const valueArr = convertToNums(formattedValue)

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
01 11 17 35 55 56
01 11 17 35 55 57
01 11 17 35 54 56
01 11 18 36 55 56
02 12 17 35 55 56
02 11 17 36 55 56
01 11 27 30 43 60
02 04 27 53 55 59
02 10 29 47 54 58
02 13 20 29 31 45
03 17 18 22 50 54
04 08 16 24 26 54
04 08 30 49 54 57
04 13 24 42 49 51
05 12 44 48 53 57
05 15 17 18 52 54
05 21 22 31 34 49
06 20 25 27 38 46
07 15 25 37 40 43
08 10 11 55 56 59
08 11 12 17 23 40
08 11 14 18 37 39
08 17 40 53 54 57
08 19 23 35 40 48
08 21 29 31 38 43
09 18 29 37 44 47
09 24 41 49 55 58
10 13 25 30 34 50
10 14 16 23 24 37
10 15 17 19 22 24
11 17 21 24 34 49
11 21 25 26 28 50
11 34 40 42 47 60
12 17 23 29 45 48
12 32 39 51 52 58
12 38 39 47 56 57
14 19 37 47 49 50
15 16 21 44 54 59
15 17 18 42 52 57
16 18 21 40 46 57
18 31 35 43 52 56
26 29 32 39 40 53
`;

const jogosArr = jogos.split("\n").map(convertToNums).filter((l) => l.length === 6)

function convertToNums(str: string) {
  return str.trim().split(" ").map(Number)
}

function countCollisions(a: number[], b: number[]) {
  let count = 0
  a.forEach((num) => {
    if (b.indexOf(num) !== -1) {
      count += 1
    }
  })
  return count
}

type CollisionCounterGroup = Record<number, number[][]>

function groupCollisions(gameResult: number[]) {
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

