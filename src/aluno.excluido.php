<?php
include_once 'db.php';

class alunos {

    private $conn;

    function __construct($conn)
    {
        $this->conn = $conn;
    }

    function getAll() {
        $sql = "SELECT 
            id, 
            nome, 
            data_nascimento,
            DATE_FORMAT(data_nascimento, '%d/%m/%Y') data_nascimento_formatado
        FROM alunos
        where excluido is true";
        $result = $this->conn->query($sql);

        $data = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    function restaureById($id) {
        $sql = "UPDATE alunos SET excluido = FALSE WHERE id = ?";
        $stm = $this->conn->prepare($sql);

        $stm->bind_param('i', $id);
        $stm->execute();

        if ($stm->affected_rows > 0) {
            return ['status' => 'ok', 'msg' => 'Registro restaurado com sucesso'];
        }

        return ['status' => 'error', 'msg' => 'Falha ao restaurar registro'];
    }
}

$allowed_methods = [
    'GET',
    'PUT'
];

if (!in_array($_SERVER['REQUEST_METHOD'], $allowed_methods)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode( [
        'status' => 'error',
        'msg' => 'Invalid Request'
    ] );
}

$alunos = new alunos($conn);

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($alunos->restaureById($data['id']));
    return;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode($alunos->getAll());
    return;
}


