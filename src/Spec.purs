module Spec where

import Game (nextField, field)

import Prelude (Unit, discard, show)
import Effect (Effect)
import Effect.Console (log)

test ∷ Effect Unit
test = do
  let a = field 12 12
  let b = nextField a 
  let c = nextField b
  let d = nextField c
  let e = nextField d
  let f = nextField e
  log ( show a )
  log ( " --- ")
  log ( show b )
  log ( " --- ")
  log ( show c )
  log ( " --- ")
  log ( show d )
  log ( " --- ")
  log ( show e )
  log ( " --- ")
  log ( show f )
  log ( " --- ")