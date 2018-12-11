<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "books".
 *
 * @property int $id
 * @property string $bookName
 * @property string $bookAuthor
 * @property string $date
 * @property int $bookPage
 * @property string $bookKey
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'books';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'bookName', 'bookAuthor', 'date', 'bookPage', 'bookKey'], 'required'],
            [['id', 'bookPage'], 'integer'],
            [['bookName', 'bookAuthor', 'bookKey'], 'string'],
            [['date'], 'safe'],
            [['id'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'bookName' => '书名',
            'bookAuthor' => '作者',
            'date' => 'Date',
            'bookPage' => 'Book Page',
            'bookKey' => 'Book Key',
        ];
    }
}
