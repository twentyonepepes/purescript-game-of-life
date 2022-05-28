module Main where

import Prelude 
import Effect (Effect)
import Effect.Console (log, clear)
import Spec (test)

main ∷ Effect Unit
main = do
  test
