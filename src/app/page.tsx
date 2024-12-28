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
04 07 15 19 34 41 45 58
05 07 10 11 16 19 25 54
09 10 14 21 30 31 37 55
10 12 25 36 39 43 57 59
19 29 34 38 41 47 55 60
02 08 15 29 31 39 56
02 10 12 27 37 40 53
03 06 14 28 30 41 60
06 09 16 29 32 46 51
07 08 18 39 42 46 60
07 29 42 44 45 52 57
09 20 24 26 30 34 35
10 13 18 24 31 44 49
12 31 32 44 46 54 59
26 30 34 46 51 54 60
01 15 24 43 44 50
01 18 34 39 51 58
01 21 34 41 43 52
03 21 43 45 49 54
04 06 19 51 53 54
04 09 20 42 56 59
04 17 29 44 50 55
05 10 39 41 45 54
05 23 41 42 51 54
07 12 18 25 43 53
07 23 35 39 40 58
09 20 38 52 54 59
15 35 37 39 47 58
18 21 25 26 38 60
41 42 46 51 55 58
`;

const jogosArr = jogos.split("\n").map(convertToNums).filter((l) => l.length >= 6)

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

/*
09 10 14 21 30 31 37 55
10 12 25 36 39 43 57 59
19 29 34 38 41 47 55 60
05 07 10 11 16 19 25 54
04 07 15 19 34 41 45 58

26 30 34 46 51 54 60
12 31 32 44 46 54 59
06 09 16 29 32 46 51
07 29 42 44 45 52 57
10 13 18 24 31 44 49
07 08 18 39 42 46 60
03 06 14 28 30 41 60
02 08 15 29 31 39 56
02 10 12 27 37 40 53
09 20 24 26 30 34 35

01 21 34 41 43 52
01 15 24 43 44 50
01 18 34 39 51 58
15 35 37 39 47 58
07 23 35 39 40 58

18 21 25 26 38 60
03 21 43 45 49 54
07 12 18 25 43 53
05 23 41 42 51 54
04 17 29 44 50 55
04 09 20 42 56 59
04 06 19 51 53 54
09 20 38 52 54 59
05 10 39 41 45 54
41 42 46 51 55 58
*/
