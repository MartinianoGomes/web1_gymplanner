const exercicios = [   
    {
        "id": "8ad4a8cc-12a2-4a60-a3a9-0efc5151e3f7",
        "nome": "Supino reto com barra",
        "descricao": "Deitado no banco, segure a barra na linha do peito e empurre até estender os braços. Fortalece os peitorais, deltoides anteriores e tríceps.",
        "aparelho": "Banco reto e barra",
        "grupo_muscular": "Peito"
    },
    {
        "id": "c39385eb-e253-4474-916f-4a8f2f43b8b9",
        "nome": "Supino inclinado com halteres",
        "descricao": "No banco inclinado (~30°), empurre halteres do peitoral superior, ativando fibras claviculares do peitoral.",
        "aparelho": "Banco inclinado e halteres",
        "grupo_muscular": "Peito"
    },
    {
        "id": "9294b576-b109-47e8-9bf5-5d3270475486",
        "nome": "Crucifixo com halteres",
        "descricao": "Deitado, braços semi-flexionados abrem em arco lateral, alongando peitoral.",
        "aparelho": "Banco e halteres",
        "grupo_muscular": "Peito"
    },
    {
        "id": "28082e69-4f38-4112-8b49-a907d49b2e69",
        "nome": "Mergulho (dip)",
        "descricao": "Entre barras paralelas, desça o tronco à frente até ângulo de 90°, suba estendendo os braços.",
        "aparelho": "Barras paralelas",
        "grupo_muscular": "Peito"
    },
    {
        "id": "8f291469-f5a0-45ef-933b-3642336da3be",
        "nome": "Flexão de braço",
        "descricao": "Corpo alinhado, mãos no chão afastadas, empurre o tronco.",
        "aparelho": "Peso corporal",
        "grupo_muscular": "Peito"
    },
    {
        "id": "f6208171-1986-48f2-80d9-2eaa8a9b201b",
        "nome": "Crucifixo no crossover",
        "descricao": "Em máquina com polias, junte braços à frente, ativando o peitoral com tensão constante.",
        "aparelho": "Crossover (cabos)",
        "grupo_muscular": "Peito"
    },
    {
        "id": "47fd5372-c453-4f92-8a47-15ca0973d733",
        "nome": "Pullover com halter",
        "descricao": "Deitado transversalmente, segure halter acima da cabeça e traga atrás; trabalha peitoral e dorsais.",
        "aparelho": "Banco e halter",
        "grupo_muscular": "Peito"
    },
    {
        "id": "be4ca371-9150-46d0-b916-2d12be919aeb",
        "nome": "Supino declinado com barra",
        "descricao": "Banco declinado, empurre a barra para trabalhar a parte inferior do peitoral.",
        "aparelho": "Banco declinado e barra",
        "grupo_muscular": "Peito"
    },
    {
        "id": "4ebddffe-7558-4007-9f97-736338e4f490",
        "nome": "Crucifixo inclinado com halteres",
        "descricao": "No banco inclinado, arco com halteres foca no peitoral superior.",
        "aparelho": "Banco inclinado e halteres",
        "grupo_muscular": "Peito"
    },
    {
        "id": "9e337cc5-3580-42ed-9e9f-3d38489b32ce",
        "nome": "Cross borda alta",
        "descricao": "Em polia alta, puxe os cabos rumo ao centro do peito, mantendo tensão constante.",
        "aparelho": "Polia alta",
        "grupo_muscular": "Peito"
    },
    {
        "id": "d12c0171-fae1-49b4-92a9-baa9d2907a55",
        "nome": "Agachamento livre",
        "descricao": "Com barra nos ombros, flexione quadris e joelhos até formar ângulo de 90°, ativando glúteos e coxas.",
        "aparelho": "Barra e anilhas",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "3b31d8b4-24e3-4e06-8ba3-4bafb0040de6",
        "nome": "Avanço (afundo)",
        "descricao": "Dê um passo à frente e abaixe o corpo até o joelho quase tocar o chão.",
        "aparelho": "Halteres ou barra",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "63f1b168-6276-41ef-a913-6d9e8f7ab7ca",
        "nome": "Glute bridge",
        "descricao": "Deitado, eleve os quadris com os pés apoiados no solo, contraindo os glúteos.",
        "aparelho": "Peso corporal ou barra",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "77233db8-d8df-4e89-a842-eedbfd3db3cb",
        "nome": "Hip thrust",
        "descricao": "Costas apoiadas no banco, eleve os quadris com barra sobre o quadril.",
        "aparelho": "Banco e barra",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "1c679d7a-2dc7-4d67-81b3-fb373f4ff380",
        "nome": "Agachamento búlgaro",
        "descricao": "Um pé apoiado atrás e outro à frente; agache mantendo o tronco ereto.",
        "aparelho": "Banco e halteres",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "e2a258f5-d805-4eff-b842-f434c6327866",
        "nome": "Levantamento terra sumô",
        "descricao": "Pernas afastadas, segure a barra e levante mantendo postura ereta.",
        "aparelho": "Barra e anilhas",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "9bf88059-2ffc-45ca-9338-ceded214826a",
        "nome": "Step-up",
        "descricao": "Suba em um banco ou plataforma, ativando glúteo e quadríceps.",
        "aparelho": "Caixa ou banco",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "8a7f20e1-6023-48b1-acc3-1f843462dcb7",
        "nome": "Kickback no cabo",
        "descricao": "Com o pé preso ao cabo, estenda a perna para trás, contraindo o glúteo.",
        "aparelho": "Máquina de polia",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "e3965fe2-cded-440e-a5ed-8ddd771508b0",
        "nome": "Abdução no solo",
        "descricao": "Deitado de lado, levante a perna de cima até sentir ativação no glúteo médio.",
        "aparelho": "Peso corporal",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "bd312ed9-8ea0-46a1-b0a7-41c814ab948a",
        "nome": "Agachamento no Smith",
        "descricao": "Agachamento guiado com barra fixa, para maior controle de movimento.",
        "aparelho": "Máquina Smith",
        "grupo_muscular": "Glúteo"
    },
    {
        "id": "f185b4e0-0340-4dd7-ab62-a54ae03276e5",
        "nome": "Encolhimento com halteres",
        "descricao": "De pé, segure halteres e eleve os ombros para cima.",
        "aparelho": "Halteres",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "3ae53517-c364-4912-886e-e74a67ca6454",
        "nome": "Encolhimento com barra",
        "descricao": "Similar ao halteres, mas com barra na frente do corpo.",
        "aparelho": "Barra",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "acd244e7-e971-4fff-95c0-147866f18395",
        "nome": "Remada alta",
        "descricao": "Puxe a barra na linha do peito com pegada fechada.",
        "aparelho": "Barra ou polia",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "6d3813a6-cd12-428d-86e3-f7eb904c09d2",
        "nome": "Remada curvada",
        "descricao": "Flexione o tronco e puxe a barra na direção do abdômen.",
        "aparelho": "Barra",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "68729a3d-dfc2-4754-a434-9a43e5a67dc1",
        "nome": "Remada baixa",
        "descricao": "Sentado, puxe o cabo para a cintura, ativando parte inferior do trapézio.",
        "aparelho": "Máquina com polia baixa",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "1a79f4d0-2bba-4d54-85e8-2d83d24eaa4b",
        "nome": "Face pull",
        "descricao": "Com polia alta, puxe o cabo em direção ao rosto com cotovelos altos.",
        "aparelho": "Polia alta e corda",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "29071fae-38ef-4d36-898a-85de2fb46c28",
        "nome": "Remada cavalinho",
        "descricao": "Apoiado na máquina T-bar, puxe com pegada neutra.",
        "aparelho": "Máquina T-bar",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "6520509e-5576-4202-a882-509250d87b0d",
        "nome": "Remada em pé na máquina Smith",
        "descricao": "Com barra guiada, puxe de forma vertical.",
        "aparelho": "Máquina Smith",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "25b23e16-92f6-4ee2-9300-a361ae493435",
        "nome": "Crucifixo invertido",
        "descricao": "Sentado, abra os braços em arco para trás.",
        "aparelho": "Peck-deck invertido",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "73e6c1b5-5401-44d1-a565-381f5c9ed8e8",
        "nome": "Encolhimento na máquina",
        "descricao": "Máquina específica onde o movimento é elevar os ombros.",
        "aparelho": "Máquina de trapézio",
        "grupo_muscular": "Trapézio"
    },
    {
        "id": "f7af3d54-3e1a-45a6-b8d0-7209c382954b",
        "nome": "Rosca direta com barra",
        "descricao": "Flexione os cotovelos trazendo a barra até a linha do peito.",
        "aparelho": "Barra reta",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "26b0fd1a-67de-4c2f-92b7-bcb3030a1a0d",
        "nome": "Rosca alternada com halteres",
        "descricao": "Flexione um braço por vez com halteres, mantendo o cotovelo fixo.",
        "aparelho": "Halteres",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "ac887834-54c1-41d5-97c0-095a27e3d5ee",
        "nome": "Rosca martelo",
        "descricao": "Sem rotação do punho, simula golpe de martelo, ativando braquiorradial.",
        "aparelho": "Halteres",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "c94ba799-fdf7-446d-b7b1-169472afcf86",
        "nome": "Rosca concentrada",
        "descricao": "Sentado, execute a rosca com um braço apoiado na coxa.",
        "aparelho": "Halter",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "4cc91820-1859-444a-8ae6-84062e688c4b",
        "nome": "Rosca scott",
        "descricao": "Braços apoiados na máquina, isola o bíceps na contração.",
        "aparelho": "Banco Scott e barra",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "c29efecb-fccd-45ab-82b6-4536f7550827",
        "nome": "Rosca inversa",
        "descricao": "Pegada pronada, trabalha também antebraços.",
        "aparelho": "Barra ou halteres",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "6f154912-5b6d-4b03-b2f9-75d60033adf6",
        "nome": "Rosca 21",
        "descricao": "Série dividida em 3 partes: parte inferior, superior e completa.",
        "aparelho": "Barra reta",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "e34f772f-a265-4ee9-83e6-380be307ee90",
        "nome": "Rosca com polia baixa",
        "descricao": "Tensão constante ao longo do movimento.",
        "aparelho": "Polia baixa e barra",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "1f7c8170-1d4d-4ef7-b299-e1544f05eea4",
        "nome": "Rosca no cross",
        "descricao": "Puxada frontal com pegada supinada.",
        "aparelho": "Crossover",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "4109cac6-7711-4e0b-9deb-648261a2aa82",
        "nome": "Rosca com corda",
        "descricao": "Puxada alternada com corda em polia baixa.",
        "aparelho": "Corda e polia",
        "grupo_muscular": "Bíceps"
    },
    {
        "id": "14ddd97a-467d-4b15-b8c4-f61ad02607e8",
        "nome": "Elevação em pé na máquina",
        "descricao": "Fique na ponta dos pés com peso sobre os ombros.",
        "aparelho": "Máquina de panturrilha em pé",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "ac42d301-8e1d-4fe5-a10a-87ad6f48d1a3",
        "nome": "Elevação sentado",
        "descricao": "Peso sobre os joelhos enquanto se eleva os calcanhares.",
        "aparelho": "Máquina de panturrilha sentada",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "4ad2a369-2dbf-4b2a-a98b-4faf49fb4492",
        "nome": "Panturrilha no leg press",
        "descricao": "Empurre com a ponta dos pés a plataforma do leg press.",
        "aparelho": "Leg press",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "28618a67-9ff6-4e66-9553-acecc7751a55",
        "nome": "Saltos com halteres",
        "descricao": "Saltos contínuos com halteres ativando tríceps sural.",
        "aparelho": "Halteres",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "5dab9444-4eaf-40ab-9891-b61fa178dd7f",
        "nome": "Caminhada na ponta dos pés",
        "descricao": "Ande na ponta dos pés com ou sem peso.",
        "aparelho": "Peso corporal ou halteres",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "16dc92e5-2a36-4f47-aae0-3dcfadb6571b",
        "nome": "Panturrilha unilateral",
        "descricao": "Execução com uma perna por vez.",
        "aparelho": "Degrau e halter",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "0cad39bb-810d-4235-987b-7f0adb476091",
        "nome": "Elevação na escada",
        "descricao": "Suba e desça escadas na ponta dos pés.",
        "aparelho": "Escada",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "bcc68fd1-15ac-423f-ab36-a29349b16d77",
        "nome": "Panturrilha na barra guiada",
        "descricao": "Execução com barra fixa no Smith.",
        "aparelho": "Máquina Smith",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "a438d3e9-55ec-4fc6-9ddd-ed60a2a08317",
        "nome": "Panturrilha em prancha",
        "descricao": "Elevação com peso nas costas sobre prancha inclinada.",
        "aparelho": "Plataforma",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "19023841-0e7b-4f20-b43d-2a5c64b9d4c9",
        "nome": "Salto vertical com peso",
        "descricao": "Salto parado com halteres.",
        "aparelho": "Halteres",
        "grupo_muscular": "Panturrilha"
    },
    {
        "id": "4bb41b2e-ef49-4838-a061-b3c86386218f",
        "nome": "Abdominal supra",
        "descricao": "Deitado, eleve o tronco até sentir contração no abdômen.",
        "aparelho": "Peso corporal",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "b6d852ac-cd21-4f4e-996e-718fe64c2cc5",
        "nome": "Abdominal infra",
        "descricao": "Elevação das pernas para ativar região inferior abdominal.",
        "aparelho": "Peso corporal",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "9f9b7416-3312-4a1c-b0b4-627fd5160a8c",
        "nome": "Prancha isométrica",
        "descricao": "Apoio sobre antebraços e pontas dos pés, com corpo alinhado.",
        "aparelho": "Peso corporal",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "47d55be5-43ae-454b-b66d-3464a9f70fe4",
        "nome": "Abdominal na polia",
        "descricao": "Puxe corda de polia alta com flexão de tronco.",
        "aparelho": "Polia alta e corda",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "bd8067bd-0e80-48ce-a81c-bfe1beb681be",
        "nome": "Abdominal oblíquo",
        "descricao": "Movimento de rotação ativando musculatura lateral.",
        "aparelho": "Peso corporal ou halteres",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "f89a0f50-b73a-4f5e-af5a-1d4fd218e9f2",
        "nome": "Prancha lateral",
        "descricao": "Apoiado em um antebraço, mantenha corpo alinhado de lado.",
        "aparelho": "Peso corporal",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "1119b240-6247-4a5e-b7a6-6012893da392",
        "nome": "Elevação de pernas na barra",
        "descricao": "Suspenso, eleve as pernas até a linha do quadril.",
        "aparelho": "Barra fixa",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "e390fda9-b7b4-4dc3-b998-a842fa3107c8",
        "nome": "Abdominal na máquina",
        "descricao": "Com resistência, flexione o tronco.",
        "aparelho": "Máquina de abdominal",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "be2c603b-ba66-4c07-b7a5-1b9c0adadbdf",
        "nome": "Ab roll",
        "descricao": "Rolo abdominal para extensão e retorno.",
        "aparelho": "Roda abdominal",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "6f123e51-ce0a-4838-9591-62a9d958f8de",
        "nome": "Abdominal no banco declinado",
        "descricao": "Maior amplitude e dificuldade com peso adicional.",
        "aparelho": "Banco declinado",
        "grupo_muscular": "Abdomen"
    },
    {
        "id": "6d737bbe-fde8-4106-ad51-851ac8988f3e",
        "nome": "Agachamento livre",
        "descricao": "Flexione joelhos e quadril com barra sobre os ombros.",
        "aparelho": "Barra",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "84827621-0313-4783-93c1-f6f2e4e973e2",
        "nome": "Leg press",
        "descricao": "Empurre plataforma com os pés.",
        "aparelho": "Máquina de leg press",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "cd5425e3-ef6a-4703-9b61-318d56c8aed9",
        "nome": "Cadeira extensora",
        "descricao": "Extensão dos joelhos ativando quadríceps isoladamente.",
        "aparelho": "Máquina extensora",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "824c98b2-e741-4e75-af18-51bb97ac1744",
        "nome": "Agachamento frontal",
        "descricao": "Barra na frente dos ombros para maior ênfase no quadríceps.",
        "aparelho": "Barra",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "72497a5b-fb08-420d-b3ff-e1139d1ac833",
        "nome": "Passada com barra",
        "descricao": "Avance alternando pernas com barra apoiada.",
        "aparelho": "Barra",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "f4d5a8b4-1301-42f4-ad0c-83057966d1ee",
        "nome": "Agachamento no Smith",
        "descricao": "Agachamento guiado com maior estabilidade.",
        "aparelho": "Máquina Smith",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "4f7d2f50-4789-493e-909d-dde8ab93f1fa",
        "nome": "Agachamento com halteres",
        "descricao": "Halteres nas mãos ao lado do corpo.",
        "aparelho": "Halteres",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "baef0be4-a9e1-47a8-8e76-67cf1c47f67c",
        "nome": "Agachamento búlgaro",
        "descricao": "Um pé apoiado atrás, maior isolamento unilateral.",
        "aparelho": "Banco e halteres",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "9be2b1b7-5f28-4ae9-aab9-b8ca32d94201",
        "nome": "Step-up",
        "descricao": "Suba em banco ou caixa com carga.",
        "aparelho": "Banco e halteres",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "56b6c999-80eb-4679-b86c-108e4a4a9e2c",
        "nome": "Cadeira hack",
        "descricao": "Execução guiada em máquina inclinada.",
        "aparelho": "Máquina hack",
        "grupo_muscular": "Quadríceps"
    },
    {
        "id": "d9447b3d-4dbd-45e1-8d7a-7f229c24d602",
        "nome": "Tríceps pulley",
        "descricao": "Puxada frontal com cotovelos fixos ao corpo.",
        "aparelho": "Polia e barra reta",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "0327679a-e885-4994-97b5-0b47058d34ef",
        "nome": "Tríceps testa",
        "descricao": "Deitado, barra vem à testa e volta.",
        "aparelho": "Banco e barra",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "2b6dd0a9-2e9c-47bb-86e0-6d437feee86c",
        "nome": "Mergulho entre bancos",
        "descricao": "Mãos no banco, pés à frente, desça e suba.",
        "aparelho": "Dois bancos",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "4a1a83fc-b44b-4bbb-bbe7-5dd75a1eba7b",
        "nome": "Tríceps coice",
        "descricao": "Inclinado, estenda o antebraço para trás.",
        "aparelho": "Halter",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "79523b08-67e6-4bda-a2bf-9c5bf42a0bc0",
        "nome": "Tríceps corda",
        "descricao": "Puxada frontal abrindo no final do movimento.",
        "aparelho": "Polia e corda",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "53fc4a52-8220-4665-978b-75dd4316c0bf",
        "nome": "Tríceps banco",
        "descricao": "Estenda o braço sobre a cabeça segurando halter.",
        "aparelho": "Banco e halter",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "6a0f0a02-42d0-41df-a468-0119ce16abd7",
        "nome": "Tríceps francês",
        "descricao": "Extensão bilateral com barra atrás da cabeça.",
        "aparelho": "Barra W ou reta",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "3181b74b-ba33-49b1-b734-463d1ccf1446",
        "nome": "Tríceps kickback polia",
        "descricao": "Igual ao coice, mas com resistência de polia.",
        "aparelho": "Polia baixa",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "4f676977-1b0a-42d1-ab0a-f8960e01301e",
        "nome": "Tríceps invertido",
        "descricao": "Pegada supinada na polia.",
        "aparelho": "Polia e barra",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "114042d7-d93f-4dfd-848e-2e0d82a8a35b",
        "nome": "Tríceps máquina",
        "descricao": "Sentado, empurre as alças para baixo.",
        "aparelho": "Máquina de tríceps",
        "grupo_muscular": "Tríceps"
    },
    {
        "id": "33687400-7ffd-4ca3-901c-881ca834e119",
        "nome": "Puxada frontal",
        "descricao": "Sentado, puxe a barra até o peito.",
        "aparelho": "Máquina de puxada alta",
        "grupo_muscular": "Costas"
    },
    {
        "id": "3980353e-31f8-4806-89fd-954d1f3d92f3",
        "nome": "Remada curvada",
        "descricao": "Puxe a barra com tronco inclinado.",
        "aparelho": "Barra",
        "grupo_muscular": "Costas"
    },
    {
        "id": "06b6900e-2aed-4da9-92d8-9a706e7d4946",
        "nome": "Remada unilateral",
        "descricao": "Apoie um joelho no banco e reme com o outro braço.",
        "aparelho": "Banco e halter",
        "grupo_muscular": "Costas"
    },
    {
        "id": "93d5fb67-f9c5-4e60-9c42-294165f49a8a",
        "nome": "Remada baixa",
        "descricao": "Sentado, puxe a alça em direção ao abdômen.",
        "aparelho": "Polia baixa",
        "grupo_muscular": "Costas"
    },
    {
        "id": "7442f98c-7f46-4bf4-abc1-d9c2c3c90a6e",
        "nome": "Puxada atrás da nuca",
        "descricao": "Variante da puxada alta, com barra atrás da cabeça.",
        "aparelho": "Polia alta",
        "grupo_muscular": "Costas"
    },
    {
        "id": "210ac4c1-7915-4190-80f0-26491e1e1fdb",
        "nome": "Levantamento terra",
        "descricao": "Erga a barra do chão com as pernas semiflexionadas.",
        "aparelho": "Barra",
        "grupo_muscular": "Costas"
    },
    {
        "id": "ac61f7fa-f520-41a7-97f6-483c11450504",
        "nome": "Remada cavalinho",
        "descricao": "Pegada neutra puxando barra presa ao chão.",
        "aparelho": "Máquina T-bar",
        "grupo_muscular": "Costas"
    },
    {
        "id": "92a604c7-06d7-4670-b64d-941298b53b68",
        "nome": "Remada no Smith",
        "descricao": "Remada controlada com barra guiada.",
        "aparelho": "Máquina Smith",
        "grupo_muscular": "Costas"
    },
    {
        "id": "cacb4498-dbc6-4c0a-92ac-a78eab7db172",
        "nome": "Pulldown com pegada neutra",
        "descricao": "Pegada paralela puxando barra para baixo.",
        "aparelho": "Máquina de puxada",
        "grupo_muscular": "Costas"
    },
    {
        "id": "5918332f-b08b-4771-b073-589caa5bb1c9",
        "nome": "Face pull",
        "descricao": "Puxada ao rosto ativando parte superior das costas.",
        "aparelho": "Corda e polia",
        "grupo_muscular": "Costas"
    },
    {
        "id": "26e19341-6fe9-4e02-baf2-ad75cd6e1a1c",
        "nome": "Mesa flexora",
        "descricao": "Flexão de joelhos em máquina específica.",
        "aparelho": "Máquina mesa flexora",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "a5ec9490-a083-42ac-9e0d-2a42bd174dad",
        "nome": "Stiff com halteres",
        "descricao": "Descida com pernas retas ativando posteriores.",
        "aparelho": "Halteres",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "4b34e627-672d-44f2-9bbd-71bbefafb8d0",
        "nome": "Levantamento terra romeno",
        "descricao": "Desça a barra até a canela com leve flexão de joelhos.",
        "aparelho": "Barra",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "443f4b49-b775-4836-9b89-cbb37399e41a",
        "nome": "Glute ham raise",
        "descricao": "Descida e subida com apoio nos tornozelos.",
        "aparelho": "Aparelho GHR",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "0f7d4ced-4119-48d5-92b6-4680c046209c",
        "nome": "Agachamento sumô",
        "descricao": "Pernas abertas, mais ativação dos adutores e posteriores.",
        "aparelho": "Barra",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "01638b6f-48cf-4774-861d-145e8c9df462",
        "nome": "Flexora unilateral",
        "descricao": "Execução de uma perna por vez.",
        "aparelho": "Máquina flexora unilateral",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "b5ad8362-da50-4e11-be31-c49f7144c997",
        "nome": "Cadeira flexora",
        "descricao": "Sente e flexione joelhos puxando a alavanca.",
        "aparelho": "Máquina flexora sentada",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "64edf202-8244-4777-93af-8f9620437228",
        "nome": "Good morning",
        "descricao": "Flexão de quadril com barra nas costas.",
        "aparelho": "Barra",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "73714b2d-cdc1-4a11-a289-219019e5435a",
        "nome": "Kettlebell swing",
        "descricao": "Movimento explosivo com extensão do quadril.",
        "aparelho": "Kettlebell",
        "grupo_muscular": "Posterior de coxa"
    },
    {
        "id": "a86b934c-3205-45c9-ba9e-71b6bef65624",
        "nome": "Passada romena",
        "descricao": "Avanço com inclinação para focar posteriores.",
        "aparelho": "Halteres",
        "grupo_muscular": "Posterior de coxa"
    }
]
