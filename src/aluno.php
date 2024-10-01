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
        where excluido is false";
        $result = $this->conn->query($sql);

        $data = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    function getById($id) {
        $sql = "SELECT 
            id, 
            nome, 
            data_nascimento,
            DATE_FORMAT(data_nascimento, '%d/%m/%Y') data_nascimento_formatado
        FROM alunos
        WHERE id = ?";
        $stm = $this->conn->prepare($sql);

        $stm->bind_param('i', $id);
        $stm->execute();

        $result = $stm->get_result();

        $data = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    function deleteById($id) {
        $sql = "UPDATE alunos SET excluido = TRUE WHERE id = ?";
        $stm = $this->conn->prepare($sql);

        $stm->bind_param('i', $id);
        $stm->execute();

        if ($stm->affected_rows > 0) {
            return ['status' => 'ok', 'msg' => 'Registro excluído com sucesso'];
        }

        return ['status' => 'error', 'msg' => 'Falha ao excluir registro'];
    }

    function updateById($id, $data) {
        $sql = "UPDATE alunos SET 
            nome = ?,
            data_nascimento = ?
        WHERE id = ?";

        $stm = $this->conn->prepare($sql);

        $stm->bind_param('ssi', $data['nome'], $data['data_nascimento'], $id);
        $stm->execute();

        if (!$stm->error) {
            return ['status' => 'ok', 'msg' => 'Registro atualizado com sucesso'];
        }

        return ['status' => 'error', 'msg' => 'Falha ao atualizar registro'];
    }

    function create($data) {
        $sql = "INSERT INTO alunos (nome, data_nascimento) VALUES (?, ?)";

        $stm = $this->conn->prepare($sql);

        $stm->bind_param('ss', $data['nome'], $data['data_nascimento']);
        $stm->execute();

        if ($stm->affected_rows > 0) {
            return ['status' => 'ok', 'msg' => 'Registro criado com sucesso'];
        }

        return ['status' => 'error', 'msg' => 'Falha ao criar registro'];
    }
}

$allowed_methods = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
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

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($alunos->deleteById($data['id']));
    return;
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($alunos->updateById($_GET['id'], $data));
    return;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($alunos->create($data));
    return;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (strpos($_SERVER['HTTP_REFERER'], 'alunos/cadastro')) {
        echo json_encode($alunos->getById($_GET['id']));
        return;
    }

    echo json_encode($alunos->getAll());
    return;
}


