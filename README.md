# private-data-chaincode

## Collection usage:


Field|Description
 -------|------
 **name** | Nome della collezione
 **policy** | Definisce i peer dell'organizzazione autoriizzati a mantenere i dati della collection
 **requiredPeerCount** | Numero di peer richiesti per comunicare i private-data come condizione per approvare il chaincode
 **maxPeerCount** | Il numero di altri peer a cui il peer di endorsing tenterà di distribuire ai dati. Se esso si interrompe.
 **blockToLive** |  per dati sensibili, questo valore rappresenta il tempo in cui i dati rimangono sul database privato. Per mantere o dati salvati definitivamente impostare tale valore a 0.
 
 
 
 **Example:**
 
```json

 // collection_config.json
 
 [
  {
       "name": "collectionMarbles",
       "policy": "OR('Org1MSP.member', 'Org2MSP.member')",
       "requiredPeerCount": 0,
       "maxPeerCount": 3,
       "blockToLive":1000000
  },

  {
       "name": "collectionMarblePrivateDetails",
       "policy": "OR('Org1MSP.member')",
       "requiredPeerCount": 0,
       "maxPeerCount": 3,
       "blockToLive":3
  }
] 
```

** API from Class: ChaincodeStub **

`<async> putPrivateData(collection, key, value)
`

`<async> getPrivateData(collection, key)
`
