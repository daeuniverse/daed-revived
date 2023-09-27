import { atomWithStorage } from 'jotai/utils'

export const endpointInfoAtom = atomWithStorage('endpointInfo', {
  endpointURL: '',
  token: ''
})

endpointInfoAtom.debugLabel = 'endpointInfoAtom'
