"""create all table

Revision ID: fe23336269e1
Revises: 
Create Date: 2022-11-16 09:46:48.746325

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe23336269e1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('birthday', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('bio', sa.String(), nullable=False),
    sa.Column('current_goals', sa.String(), nullable=False),
    sa.Column('languages', sa.String(), nullable=False),
    sa.Column('kids', sa.String(), nullable=False),
    sa.Column('pets', sa.String(), nullable=False),
    sa.Column('hobbies', sa.String(), nullable=False),
    sa.Column('identify_as', sa.String(), nullable=False),
    sa.Column('looking_for', sa.String(), nullable=False),
    sa.Column('img_url1', sa.String(), nullable=False),
    sa.Column('img_url2', sa.String(), nullable=True),
    sa.Column('img_url3', sa.String(), nullable=True),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.Column('matched_profile_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['matched_profile_id'], ['profiles.id'], ),
    sa.ForeignKeyConstraint(['profile_id'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('matched_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['matched_id'], ['matches.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('matches')
    op.drop_table('profiles')
    op.drop_table('users')
    # ### end Alembic commands ###
