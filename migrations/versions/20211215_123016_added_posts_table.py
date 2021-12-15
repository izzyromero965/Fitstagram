"""added posts table

Revision ID: 05d3599b1eb8
Revises: 77fe35ad8ae1
Create Date: 2021-12-15 12:30:16.445340

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '05d3599b1eb8'
down_revision = '77fe35ad8ae1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=150), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('createdat', sa.DateTime(), nullable=True),
    sa.Column('updatedat', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('createdat', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('updatedat', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updatedat')
    op.drop_column('users', 'createdat')
    op.drop_table('posts')
    # ### end Alembic commands ###
