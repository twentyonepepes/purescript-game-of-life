module Spec where

import Game (nextField, field)

import Prelude (Unit, discard, show, (<#>))
import Effect (Effect)
import Effect.Console (log)

main ∷ Effect Unit
main = do
  let a = field 12 12
  let b = nextField a 
  let c = nextField b
  let d = [a,b,c]
  log ( show a )
  log ( " --- ")
  log ( show b )
  log ( " --- ")
  log ( show c )
  log ( " --- ")