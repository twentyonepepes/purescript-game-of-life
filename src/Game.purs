module Game where

import Prelude (Unit, (<>),bind, pure, discard, map, (==), (&&), show,(-),(+), negate)
import Data.Maybe (Maybe, fromMaybe)
import Matrix (Matrix, fromArray, repeat, modify, indexedMap, get)

field :: Int -> Int -> Matrix Int
field w h = do
  let a = repeat w h 0
  let b c = 1
  let c = modify 3 3 b a
  let d = fromMaybe a c
  d

rule :: Int -> Int -> Int -> Int -> Int
rule 1 0 0 0 = 1
rule 0 1 0 0 = 1
rule 0 0 1 0 = 1
rule 0 0 0 1 = 1
rule 1 1 0 0 = 1
rule 0 1 1 0 = 1
rule 0 0 1 1 = 1
rule 1 0 0 1 = 1
rule 0 1 0 1 = 1
rule 1 0 1 0 = 1
rule 1 1 1 0 = 0
rule _ _ _ _ = 0

neighbour :: Matrix Int -> Int -> Int -> Int -> Int -> Int
neighbour b x y dx dy = do
  let f1 a = fromMaybe 0 a
  let x2 = x + dx
  let y2 = y + dy
  let a = get x2 y2 b
  let b = f1 a
  b

f1 :: Matrix Int -> Int -> Int -> Int -> Int
f1 b x y a = do
  let c = neighbour b x y (-1) (0)
  let d = neighbour b x y (0) (-1)
  let e = neighbour b x y (1) (0)
  let f = neighbour b x y (0) (1)
  rule c d e f

nextField :: Matrix Int -> Matrix Int
nextField prev = do
  let f2 = f1 prev
  indexedMap f2 prev