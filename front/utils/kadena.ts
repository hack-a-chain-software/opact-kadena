export const computePactCode = ({
  args,
  proof,
  extData,
  tokenSpec
}: any) => {
  return `(test.opact.transact {
      "root": ${args.root},
      "outputCommitments": [${args.outputCommitments.join(' ')}],
      "publicAmount": ${args.publicAmount.toString()}.0,
      "extDataHash": "${args.extDataHash}",
      "tokenHash": "${args.tokenHash}"
    } {
      "public_values":[${proof.public_values.join(' ')}],
      "a":{"x": ${proof.a.x}, "y": ${proof.a.y} },
      "b":{"x":[${proof.b.x.join(' ')}],"y":[${proof.b.y.join(' ')}]},
      "c":{"x":${proof.c.x},"y":${proof.c.y}}
    } {
      "sender":"${extData.sender}",
      "recipient":"${extData.recipient}",
      "extAmount":${extData.extAmount.toFixed(1)},
      "relayer":${extData.relayer},
      "fee": 0.0,
      "encryptedOutput1":"${extData.encryptedOutput1}",
      "encryptedOutput2":"${extData.encryptedOutput2}",
      "encryptedValue":"${extData.encryptedValue}"
    } {
      "id": "${tokenSpec.id}",
      "refName":{
        "name":"${tokenSpec.refName.name}",
        "namespace":""
      },
      "refSpec":{
        "name":"${tokenSpec.refSpec.name}",
        "namespace":""
      }
    })`
}
