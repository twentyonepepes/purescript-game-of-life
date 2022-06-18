module Game where

import Prelude ( negate, (+) )
import Data.Maybe ( Maybe, fromMaybe )
import Matrix ( Matrix, repeat, modify, indexedMap, get )
import Rule ( rule )

newtype Field = Field ( Matrix Int )

field :: Int -> Int -> Matrix Int
field w h = do
  let a = repeat w h 0
  let b c = 1
  let c = modify 3 3 b a
  let d = fromMaybe a c
  d

neighbour :: Matrix Int -> Int -> Int -> Int -> Int -> Int
neighbour b x y dx dy = do
  let f1 a = fromMaybe 0 a
  let x2 = x + dx
  let y2 = y + dy
  let a = get x2 y2 b
  let b = f1 a
  b

next :: Matrix Int -> Int -> Int -> Int -> Int
next m x y a = do
  let f1 = neighbour m x y
  let c = f1 (-1) (0)
  let d = f1 (0) (-1)
  let e = f1 (1) (0)
  let f = f1 (0) (1)
  rule c d e f

nextField :: Matrix Int -> Matrix Int
nextField field = do
  let f2 = next field
  indexedMap f2 field